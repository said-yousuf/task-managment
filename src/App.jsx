import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import AddTask from "./components/AddTask";
import UpdateTask from "./components/UpdateTask";
import PropTypes from "prop-types";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/tasks.json");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        const tasksWithIds = data.map((task, index) => ({
          ...task,
          id: task.id || index + 1,
        }));
        setTasks(tasksWithIds);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList tasks={tasks} />} />
          <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} />} />
          <Route path="/add" element={<AddTask />} />
          <Route
            path="/tasks/:id/edit"
            element={<UpdateTask tasks={tasks} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

// Home component that combines HeroSection with some additional content
const Home = () => {
  return (
    <div>
      <HeroSection />
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Task Organization"
            description="Easily organize and categorize your tasks with our intuitive interface."
          />
          <FeatureCard
            title="Deadline Tracking"
            description="Never miss a deadline with our built-in deadline tracking system."
          />
          <FeatureCard
            title="Search & Filter"
            description="Quickly find tasks with powerful search and filter capabilities."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default App;

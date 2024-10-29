import "./App.css";
import TaskList from "./components/TaskList.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskDetails from "./components/TaskDetails.jsx";
import { useState, useEffect } from "react";

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
        // Add IDs to the tasks if they don't exist
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
    return <div className="p-4 text-center">Loading tasks...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600 text-center">{error}</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} />} />
          <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

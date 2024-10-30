import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const UpdateTask = ({ tasks }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const taskId = Number(id);

  const [task, setTask] = useState({
    title: "",
    category: "",
    description: "",
    deadline: "",
    addDate: "",
  });

  useEffect(() => {
    const taskToUpdate = tasks.find((t) => t.id === taskId);
    if (taskToUpdate) {
      setTask(taskToUpdate);
    }
  }, [taskId, tasks]);

  if (!task) {
    return (
      <div className="p-4">
        <p className="text-red-600">Task not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          Back to List
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update task functionality will be implemented later
    console.log("Updated task:", task);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm"
      >
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Title</dt>
            <dd className="text-gray-700 sm:col-span-2">
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Category</dt>
            <dd className="text-gray-700 sm:col-span-2">
              <select
                name="category"
                value={task.category}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
              </select>
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Add Date</dt>
            <dd className="text-gray-700 sm:col-span-2">
              <input
                type="date"
                name="addDate"
                value={task.addDate}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Deadline</dt>
            <dd className="text-gray-700 sm:col-span-2">
              <input
                type="date"
                name="deadline"
                value={task.deadline}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Description</dt>
            <dd className="text-gray-700 sm:col-span-2">
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex justify-end space-x-4 px-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-block rounded bg-gray-600 px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateTask.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      addDate: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UpdateTask;

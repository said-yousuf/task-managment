import TaskItem from "./TaskItem.jsx";
import PropTypes from "prop-types";
import { useState } from "react";

const TaskList = ({ tasks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  // Filter tasks based on search term
  const filteredTasks = tasks.filter((task) =>
    Object.values(task).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const fieldMapping = {
      adddate: "addDate",
      deadline: "deadline",
      title: "title",
      category: "category",
      description: "description",
    };

    const actualField = fieldMapping[sortField.toLowerCase()];
    const aValue = a[actualField];
    const bValue = b[actualField];

    if (actualField === "addDate" || actualField === "deadline") {
      return sortDirection === "asc"
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

    return sortDirection === "asc"
      ? aValue.toString().localeCompare(bValue.toString())
      : bValue.toString().localeCompare(aValue.toString());
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleSort = (field) => {
    const normalizedField = field.toLowerCase().replace(" ", "");
    if (normalizedField === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(normalizedField);
      setSortDirection("asc");
    }
  };

  // Reset to first page when searching
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const headers = [
    { label: "Title", field: "title" },
    { label: "Category", field: "category" },
    { label: "Add Date", field: "adddate" },
    { label: "Description", field: "description" },
    { label: "Deadline", field: "deadline" },
  ];

  return (
    <div className="p-4">
      {/* Search and Sort Controls */}
      <div className="mb-4 space-y-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-700">Sort by:</span>
          <select
            value={sortField}
            onChange={(e) => {
              setSortField(e.target.value.toLowerCase());
              setSortDirection("asc");
            }}
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="title">Title</option>
            <option value="category">Category</option>
            <option value="adddate">Add Date</option>
            <option value="deadline">Deadline</option>
          </select>
          <button
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
            className="px-2 py-1 border rounded hover:bg-gray-50"
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              {headers.map(({ label, field }) => (
                <th
                  key={field}
                  onClick={() => handleSort(field)}
                  className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    {sortField === field.toLowerCase() && (
                      <span className="text-indigo-600">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstTask + 1} to{" "}
          {Math.min(indexOfLastTask, sortedTasks.length)} of{" "}
          {sortedTasks.length} tasks
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

TaskList.propTypes = {
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

export default TaskList;

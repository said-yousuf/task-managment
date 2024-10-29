import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const TaskDetails = ({ tasks }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const taskId = Number(id);
  const task = tasks.find((t) => t.id === taskId);

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

  return (
    <div className="p-4">
      <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Title</dt>
            <dd className="text-gray-700 sm:col-span-2">{task.title}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Category</dt>
            <dd className="text-gray-700 sm:col-span-2">{task.category}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Add Date</dt>
            <dd className="text-gray-700 sm:col-span-2">{task.addDate}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Deadline</dt>
            <dd className="text-gray-700 sm:col-span-2">{task.deadline}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Description</dt>
            <dd className="text-gray-700 sm:col-span-2 whitespace-pre-wrap break-words">
              {task.description}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">
          Update
        </button>
        <button className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
};

TaskDetails.propTypes = {
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

export default TaskDetails;

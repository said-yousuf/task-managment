import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TaskItem = ({ task }) => {
  // Function to truncate description
  const truncateDescription = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2">{task.title}</td>
      <td className="whitespace-nowrap px-4 py-2">{task.category}</td>
      <td className="whitespace-nowrap px-4 py-2">{task.addDate}</td>
      <td className="px-4 py-2 max-w-xs">
        {truncateDescription(task.description)}
      </td>
      <td className="whitespace-nowrap px-4 py-2">{task.deadline}</td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="flex space-x-2">
          <Link
            to={`/tasks/${task.id}`}
            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            View
          </Link>
          <button className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700">
            Done
          </button>
        </div>
      </td>
    </tr>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    addDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskItem;

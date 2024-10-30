import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Task Management
            <span className="block text-blue-200">Made Simple</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:max-w-3xl">
            Organize, track, and manage your tasks efficiently. Stay productive
            and never miss a deadline.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/tasks"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition duration-150"
            >
              View Tasks
            </Link>
            <Link
              to="/add"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-150"
            >
              Add New Task
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

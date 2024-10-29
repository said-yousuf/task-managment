const HeroSection = () => {
    return (
        <div className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 mb-9">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-3xl font-extrabold sm:text-4xl">
                    Hello, Welcome Back!
                </h1>
                <p className="mt-4 text-lg sm:text-xl">
                    Organize your tasks efficiently and stay productive.
                </p>
                <div className="mt-8">
                    <a
                        href="/dashboard" // Adjust the link based on your routing
                        className="inline-block bg-white text-blue-600 rounded-full px-6 py-3 font-medium hover:bg-gray-200 transition-all duration-200"
                    >
                        Go to Dashboard
                    </a>
                    <a
                        href="/signup" // Adjust the link based on your routing
                        className="inline-block ml-4 bg-gray-200 text-blue-600 rounded-full px-6 py-3 font-medium hover:bg-gray-300 transition-all duration-200"
                    >
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

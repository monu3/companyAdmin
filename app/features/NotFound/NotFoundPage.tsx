import React from "react";
import { Link } from "react-router"; 

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-cyan-600">
      <div className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-lg w-full">
        <h1 className="text-8xl font-extrabold text-gray-900 tracking-tight">
          404
        </h1>
        <p className="text-2xl text-gray-800 mt-4">Whoops! Page Not Found</p>
        <p className="text-md text-gray-600 mt-2">
          Looks like the page you're searching for has gone missing. But no
          worries, we’ll get you back on track.
        </p>
        <div className="mt-6 flex justify-center items-center">
          <Link
            to="/" // Adjust to your dashboard route
            className="px-8 py-3 text-lg font-medium text-white bg-teal-600 rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition ease-in-out duration-300 transform hover:scale-105"
          >
            Back to Dashboard
          </Link>
        </div>
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Or you can visit our{" "}
            <Link to="/contact" className="text-teal-600 hover:underline">
              Contact Us
            </Link>{" "}
            page if you need assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

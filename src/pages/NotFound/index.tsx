import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-600 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="text-blue-500 hover:underline text-lg font-semibold"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import React from "react";
import { Link } from "react-router-dom";

const Manage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link
          to="/manage/movies"
          className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-bold mb-2 text-blue-500">
            Manage Movies
          </h2>
          <p className="text-gray-700">
            Add, edit, or delete movies from the database.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Manage;

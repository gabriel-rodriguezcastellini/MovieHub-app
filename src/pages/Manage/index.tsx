import React from "react";
import { Link } from "react-router-dom";

const Manage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage</h1>
      <ul className="list-disc list-inside mb-4">
        <li>
          <Link to="/manage/movies" className="text-blue-500 hover:underline">
            Manage Movies
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Manage;

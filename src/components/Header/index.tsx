import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className="bg-blue-500 fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-10">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="text-white text-base font-bold">
              MovieHub
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

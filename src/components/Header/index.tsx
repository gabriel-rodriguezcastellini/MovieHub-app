import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { headerList, tokenList } from "./consts";
import SignOutButton from "../SignOutButton";

const Header = ({ user }: { user: { email: string } | null }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const path = window.location.pathname;

  const handleClick = (link: string) => {
    navigate(link);
    setIsOpen(false);
  };

  const token = localStorage.getItem("token");

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => handleClick("/")}
        >
          MovieHub
        </h1>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-4`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-4">
            {token
              ? tokenList.map((item, index) => (
                  <li
                    className={`cursor-pointer ${
                      path === item.link ? "underline font-bold" : ""
                    }`}
                    key={index}
                    onClick={() => handleClick(item.link)}
                  >
                    {item.title}
                  </li>
                ))
              : headerList.map((item, index) => (
                  <li
                    className={`cursor-pointer ${
                      path === item.link ? "underline font-bold" : ""
                    }`}
                    key={index}
                    onClick={() => handleClick(item.link)}
                  >
                    {item.title}
                  </li>
                ))}
          </ul>
          {token && (
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <span className="text-sm">Welcome, {user?.email}</span>
              <SignOutButton />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

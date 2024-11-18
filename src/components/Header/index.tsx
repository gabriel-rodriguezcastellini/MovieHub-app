import { useNavigate } from "react-router-dom";
import { headerList, tokenList } from "./consts";
import SignOutButton from "../SignOutButton";

const Header = ({ user }: { user: { email: string } | null }) => {
  const navigate = useNavigate();

  const path = window.location.pathname;

  const handleClick = (link: string) => {
    navigate(link);
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
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
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
            <div className="flex items-center space-x-4">
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

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <h1>Home</h1>
      <button onClick={() => navigate("/movies")}>Go to Movies</button>
      <button onClick={() => navigate("/about")}>Go to About</button>
      <button onClick={() => navigate("/signup")}>Go to Sign Up</button>
      <button onClick={() => navigate("/login")}>Go to Log In</button>
    </div>
  );
};

export default Home;

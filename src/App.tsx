import { useEffect, useState } from "react";
import { getMovies, Movie } from "./api/movieService";
import "./App.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies();
      setMovies(moviesData as Movie[]);
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center mt-0">MovieHub</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <li key={movie._id} className="bg-white p-4 rounded shadow">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold">{movie.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

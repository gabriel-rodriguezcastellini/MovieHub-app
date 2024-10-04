import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import NavBar from "./NavBar";
import { getMovies } from "./api/movieService";
import "./App.css";

interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  releaseDate: string;
  rating: string;
}

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
    <Router>
      <NavBar />
      <div className="container mx-auto p-4 pt-20">
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

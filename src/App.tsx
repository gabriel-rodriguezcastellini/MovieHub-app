import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { getMovies } from "./api/movieService";

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
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="container mx-auto p-4 pt-20 flex-grow">
          <Routes>
            <Route path="/" element={<MovieList movies={movies} />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

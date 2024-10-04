import React from "react";
import { Link } from "react-router-dom";

interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <li key={movie._id} className="bg-white p-4 rounded shadow">
          <Link to={`/movies/${movie._id}`}>
            <div className="flex justify-center items-center h-64 mb-4">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="max-h-full max-w-full object-contain rounded"
              />
            </div>
            <h2 className="text-xl font-semibold">{movie.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;

import { Movie } from "../../types/movies";
import { Link } from "react-router-dom";

const Card = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="max-w-sm rounded overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
    >
      <div className="relative h-64 w-full">
        <img
          className="absolute inset-0 w-full h-full object-contain"
          src={movie.imageUrl}
          alt={movie.title}
        />
      </div>
      <div className="px-6 py-4 bg-white">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base line-clamp-3">
          {movie.description}
        </p>
      </div>
    </Link>
  );
};

export default Card;

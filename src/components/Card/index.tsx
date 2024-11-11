import { Movie } from "../../types/movies";
import { Link } from "react-router-dom";

const Card = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="max-w-sm rounded overflow-hidden shadow-lg"
    >
      <img className="w-full" src={movie.imageUrl} alt={movie.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base">{movie.description}</p>
      </div>
    </Link>
  );
};

export default Card;

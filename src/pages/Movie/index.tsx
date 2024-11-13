import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../store/store";
import { getMovie } from "../../slices/movies";
import { RootState } from "../../store/store";
import { Movie as MovieType } from "../../types/movies";

const Movie = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state: RootState) => state.reducer.movies
  );
  const [movie, setMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(getMovie(id)).then((action) => {
        if (action.payload && !("error" in action)) {
          setMovie(action.payload as MovieType);
        }
      });
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500">Error: {error}</div>
    );
  }

  if (!movie) {
    return <div className="text-center text-xl">Movie not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <img
          className="w-full h-auto object-contain"
          src={movie.imageUrl}
          alt={movie.title}
        />
        <h1 className="text-3xl font-bold my-4">{movie.title}</h1>
        <p className="text-gray-700 text-base">{movie.description}</p>
      </div>
    </div>
  );
};

export default Movie;

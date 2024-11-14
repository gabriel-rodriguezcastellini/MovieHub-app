import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../store/store";
import { getMovie } from "../../slices/movies";
import { RootState } from "../../store/store";
import { Movie as MovieType } from "../../types/movies";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const Movie = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    movie: movieFromStore,
  } = useSelector((state: RootState) => state.reducer.movies);
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [apiCallCompleted, setApiCallCompleted] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getMovie(id)).then((action) => {
        setApiCallCompleted(true);
        if (action.payload && !("error" in action)) {
          setMovie(action.payload as MovieType);
        }
      });
    }
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  if (error && !movieFromStore) {
    return <Error message={error} />;
  }

  if (apiCallCompleted && !movieFromStore && !error) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <img
          className="w-full h-auto object-contain"
          src={movie?.imageUrl}
          alt={movie?.title}
        />
        <h1 className="text-3xl font-bold my-4">{movie?.title}</h1>
        <p className="text-gray-700 text-base">{movie?.description}</p>
      </div>
    </div>
  );
};

export default Movie;

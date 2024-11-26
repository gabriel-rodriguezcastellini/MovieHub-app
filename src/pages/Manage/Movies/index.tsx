import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../../store/store";
import { getMovies, updateMovieVisibility } from "../../../slices/movies";
import { RootState } from "../../../store/store";
import Loading from "../../../components/Loading";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";
import Modal from "../../../components/Modal";
import { Link } from "react-router-dom";

const ManageMovies: React.FC = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.reducer.movies
  );
  const [localMovies, setLocalMovies] = useState(movies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<{
    id: string;
    isVisible: boolean;
  } | null>(null);
  const [updatingVisibility, setUpdatingVisibility] = useState<string | null>(
    null
  );

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    setLocalMovies(movies);
  }, [movies]);

  const handleToggleVisibility = async () => {
    if (selectedMovie) {
      setUpdatingVisibility(selectedMovie.id);
      setIsModalOpen(false);
      try {
        await dispatch(
          updateMovieVisibility({
            id: selectedMovie.id,
            isVisible: !selectedMovie.isVisible,
          })
        );
        setLocalMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === selectedMovie.id
              ? { ...movie, isVisible: !selectedMovie.isVisible }
              : movie
          )
        );
      } catch (error) {
        console.error("Failed to update movie visibility", error);
      } finally {
        setSelectedMovie(null);
        setUpdatingVisibility(null);
      }
    }
  };

  const openModal = (id: string, isVisible: boolean) => {
    setSelectedMovie({ id, isVisible });
    setIsModalOpen(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {localMovies.map((movie) => (
          <div key={movie._id} className="bg-white p-4 rounded-lg shadow-lg">
            <div className="relative h-64 w-full mb-4">
              <img
                className="absolute inset-0 w-full h-full object-contain"
                src={movie.imageUrl}
                alt={movie.title}
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-700 mb-2 line-clamp-3">
              {movie.description}
            </p>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`px-2 py-1 rounded-lg text-sm font-bold ${
                  movie.isVisible
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {movie.isVisible ? "Visible" : "Invisible"}
              </span>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => openModal(movie._id, movie.isVisible)}
                className={`bg-yellow-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-yellow-600 transition duration-300 disabled:opacity-50 ${
                  updatingVisibility === movie._id ? "cursor-not-allowed" : ""
                }`}
                disabled={updatingVisibility === movie._id}
              >
                {updatingVisibility === movie._id ? (
                  <div className="flex items-center justify-center">
                    <Spinner />
                    Updating...
                  </div>
                ) : movie.isVisible ? (
                  "Make Invisible"
                ) : (
                  "Make Visible"
                )}
              </button>
              <Link
                to={`/manage/movies/edit/${movie._id}`}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Edit
              </Link>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleToggleVisibility}
        title="Confirm Visibility Change"
        message={`Are you sure you want to ${
          selectedMovie?.isVisible ? "make invisible" : "make visible"
        } this movie?`}
      />
    </div>
  );
};

export default ManageMovies;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../../store/store";
import {
  getMovies,
  updateMovieVisibility,
  deleteMovie,
} from "../../../slices/movies";
import { RootState } from "../../../store/store";
import Spinner from "../../../components/Spinner";
import Modal from "../../../components/Modal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../components/Loading";
import { clearNotification } from "../../../slices/notifications";

const ManageMovies: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, loading } = useSelector(
    (state: RootState) => state.reducer.movies
  );
  const notification = useSelector(
    (state: RootState) => state.reducer.notification.message
  );
  const [localMovies, setLocalMovies] = useState(movies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<{
    id: string;
    isVisible: boolean;
  } | null>(null);
  const [loadingVisibility, setLoadingVisibility] = useState<string | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null);

  const allowedUrls = ["/manage/movies", "/manage/movies/add"];

  const validateAndNavigate = (url: string) => {
    if (allowedUrls.includes(url)) {
      navigate(url);
    }
  };

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    setLocalMovies(movies);
  }, [movies]);

  useEffect(() => {
    if (notification) {
      toast.success(notification);
      dispatch(clearNotification());
    }
  }, [notification, dispatch]);

  const handleToggleVisibility = async () => {
    if (selectedMovie) {
      setLoadingVisibility(selectedMovie.id);
      setIsModalOpen(false);
      try {
        const result = await dispatch(
          updateMovieVisibility({
            id: selectedMovie.id,
            isVisible: !selectedMovie.isVisible,
          })
        );
        if (result.meta.requestStatus === "fulfilled") {
          setLocalMovies((prevMovies) =>
            prevMovies.map((movie) =>
              movie._id === selectedMovie.id
                ? { ...movie, isVisible: !selectedMovie.isVisible }
                : movie
            )
          );
          toast.success("Movie visibility updated successfully!");
        } else {
          throw new Error("Failed to update movie visibility.");
        }
      } catch {
        toast.error("Failed to update movie visibility. Please try again.");
      } finally {
        setSelectedMovie(null);
        setLoadingVisibility(null);
      }
    }
  };

  const handleDeleteMovie = async () => {
    if (movieToDelete) {
      try {
        await dispatch(deleteMovie(movieToDelete));
        setLocalMovies((prevMovies) =>
          prevMovies.filter((movie) => movie._id !== movieToDelete)
        );
        toast.success("Movie deleted successfully!");
        setIsDeleteModalOpen(false);
        setMovieToDelete(null);
      } catch {
        toast.error("Failed to delete movie. Please try again.");
      }
    }
  };

  const openModal = (id: string, isVisible: boolean) => {
    setSelectedMovie({ id, isVisible });
    setIsModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setMovieToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleAddMovie = () => {
    validateAndNavigate("/manage/movies/add");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Manage Movies</h1>
        <button
          onClick={handleAddMovie}
          className="bg-green-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-green-600 transition duration-300"
        >
          Add Movie
        </button>
      </div>
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
                className={`bg-yellow-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-yellow-600 transition duration-300 ${
                  loadingVisibility === movie._id ? "cursor-not-allowed" : ""
                }`}
                disabled={loadingVisibility === movie._id}
              >
                {loadingVisibility === movie._id ? (
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
              <button
                onClick={() => openDeleteModal(movie._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
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
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteMovie}
        title="Confirm Delete"
        message="Are you sure you want to delete this movie? This action cannot be undone."
      />
    </div>
  );
};

export default ManageMovies;

import React, { useState } from "react";
import { useDispatch } from "../../../../store/store";
import { addMovie } from "../../../../slices/movies";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { movieSchema } from "./validation";
import Spinner from "../../../../components/Spinner";
import { Movie } from "../../../../types/movies";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMovie: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Movie>({
    resolver: joiResolver(movieSchema),
  });

  const handleAddMovie = handleSubmit(async (data) => {
    setLoading(true);

    try {
      const result = await dispatch(addMovie(data));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Movie added successfully!");
        navigate("/manage/movies");
      } else {
        throw new Error("Failed to add movie");
      }
    } catch (error) {
      console.error("Failed to add movie", error);
      toast.error("Failed to add movie. Please try again.");
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Movie</h1>
        <form onSubmit={handleAddMovie}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-600 font-bold mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-600 font-bold mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              {...register("imageUrl")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.imageUrl && (
              <p className="text-red-600 font-bold mt-1">
                {errors.imageUrl.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Spinner />
                Adding...
              </div>
            ) : (
              "Add Movie"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMovie;

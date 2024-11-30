import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { movieSchema } from "../../validations/movieSchema";
import Spinner from "../Spinner";
import { Movie } from "../../types/movies";

interface MovieFormProps {
  initialValues?: Movie;
  onSubmit: (data: Movie) => Promise<void>;
  isLoading: boolean;
  buttonText: string;
}

const MovieForm: React.FC<MovieFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
  buttonText,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Movie>({
    resolver: joiResolver(movieSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      setValue("title", initialValues.title);
      setValue("description", initialValues.description);
      setValue("imageUrl", initialValues.imageUrl);
    }
  }, [initialValues, setValue]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {buttonText} Movie
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spinner />
                {buttonText}...
              </div>
            ) : (
              buttonText
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;

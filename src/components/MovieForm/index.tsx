import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { movieSchema } from "../../validations/movieSchema";
import Spinner from "../Spinner";
import { Movie } from "../../types/movies";
import { toast } from "react-toastify";

interface MovieFormProps {
  initialValues?: Movie;
  onSubmit: (data: Movie) => void;
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
      setValue("isVisible", initialValues.isVisible);
    }
  }, [initialValues, setValue]);

  const handleFormSubmit = async (data: Movie) => {
    try {
      await movieSchema.validateAsync(data, { abortEarly: false });
      onSubmit(data);
    } catch (error: unknown) {
      if ((error as Joi.ValidationError).isJoi) {
        (error as Joi.ValidationError).details.forEach(
          (detail: { message: string }) => {
            toast.error(detail.message);
          }
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {buttonText} Movie
        </h1>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Visibility
            </label>
            <input
              type="checkbox"
              {...register("isVisible")}
              className="mr-2 leading-tight"
            />
            <span className="text-gray-700">Visible</span>
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

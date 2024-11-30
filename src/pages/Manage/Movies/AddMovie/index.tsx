import React, { useState } from "react";
import { useDispatch } from "../../../../store/store";
import { addMovie } from "../../../../slices/movies";
import { useNavigate } from "react-router-dom";
import MovieForm from "../../../../components/MovieForm";
import { Movie } from "../../../../types/movies";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMovie: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const timeout = 3000;

  const handleAddMovie = async (data: Movie) => {
    setLoading(true);
    try {
      const result = await dispatch(addMovie(data));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Movie added successfully!", { autoClose: timeout });
        setIsRedirecting(true);
        setTimeout(() => {
          navigate("/manage/movies");
        }, timeout);
      } else {
        const errorMessage = result.payload?.message || "Failed to add movie";
        throw new Error(errorMessage);
      }
    } catch (error: unknown) {
      console.error("Failed to add movie", error);
      toast.error(error.message || "Failed to add movie. Please try again.", {
        autoClose: timeout,
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, timeout);

      if (!isRedirecting) {
        setIsRedirecting(false);
      }
    }
  };

  return (
    <MovieForm
      onSubmit={handleAddMovie}
      isLoading={loading || isRedirecting}
      buttonText="Add"
    />
  );
};

export default AddMovie;

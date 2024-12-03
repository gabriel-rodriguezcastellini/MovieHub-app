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

  const handleAddMovie = async (data: Movie) => {
    setLoading(true);
    try {
      const result = await dispatch(addMovie(data));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Movie added successfully!");
        navigate("/manage/movies");
      } else {
        toast.error(result.payload);
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieForm onSubmit={handleAddMovie} isLoading={loading} buttonText="Add" />
  );
};

export default AddMovie;

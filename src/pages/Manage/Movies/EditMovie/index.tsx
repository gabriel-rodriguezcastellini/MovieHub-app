import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootState } from "../../../../store/store";
import { getMovie, updateMovie } from "../../../../slices/movies";
import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "../../../../components/MovieForm";
import { Movie } from "../../../../types/movies";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { movie } = useSelector((state: RootState) => state.reducer.movies);
  const timeout = 3000;

  useEffect(() => {
    if (id) {
      dispatch(getMovie(id));
    }
  }, [dispatch, id]);

  const handleUpdateMovie = async (data: Movie) => {
    setLoading(true);
    try {
      const result = await dispatch(updateMovie({ id: id!, ...data }));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Movie updated successfully!", { autoClose: timeout });
        setIsRedirecting(true);
        setTimeout(() => {
          navigate("/manage/movies");
        }, timeout);
      } else {
        const errorMessage =
          result.payload?.message || "Failed to update movie";
        throw new Error(errorMessage);
      }
    } catch (error: unknown) {
      console.error("Failed to update movie", error);
      toast.error(
        error.message || "Failed to update movie. Please try again.",
        {
          autoClose: timeout,
        }
      );
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
      initialValues={movie}
      onSubmit={handleUpdateMovie}
      isLoading={loading || isRedirecting}
      buttonText="Update"
    />
  );
};

export default EditMovie;

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
  const { movie } = useSelector((state: RootState) => state.reducer.movies);

  useEffect(() => {
    if (id) {
      dispatch(getMovie(id));
    }

    return () => {
      dispatch({ type: "movies/resetMovie" });
    };
  }, [dispatch, id]);

  const handleUpdateMovie = async (data: Movie) => {
    setLoading(true);
    try {
      const result = await dispatch(updateMovie({ id: id!, data }));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Movie updated successfully!");
        navigate("/manage/movies");
      } else {
        toast.error(result.payload);
      }
    } catch {
      toast.error("Failed to update movie. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieForm
      initialValues={movie ?? undefined}
      onSubmit={handleUpdateMovie}
      isLoading={loading}
      buttonText="Update"
    />
  );
};

export default EditMovie;

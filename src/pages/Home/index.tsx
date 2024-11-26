import { useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { getVisibleMovies } from "../../slices/movies";
import Card from "../../components/Card";
import { RootState } from "../../store/store";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const Home = () => {
  const dispatch = useDispatch();
  const {
    visibleMovies: movies,
    loading,
    error,
  } = useSelector((state: RootState) => state.reducer.movies);

  useEffect(() => {
    dispatch(getVisibleMovies());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Card key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;

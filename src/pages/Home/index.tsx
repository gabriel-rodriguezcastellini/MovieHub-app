import { useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { getMovies } from "../../slices/movies";
import Card from "../../components/Card";
import { RootState } from "../../store/store";

const Home = () => {
  const dispatch = useDispatch();
  const {
    list: movies,
    loading,
    error,
  } = useSelector((state: RootState) => state.reducer.movies);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500">Error: {error}</div>
    );
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

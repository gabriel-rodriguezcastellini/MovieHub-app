import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "./api/movieService";

interface Movie {
  title: string;
  description: string;
  rating: number;
  releaseDate: string;
  imageUrl: string;
  genre: string;
  director: string;
  duration: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const movieData: Movie = (await getMovieById(id)) as Movie;
          setMovie(movieData);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (!movie) {
    return <div className="text-center text-xl">Movie not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="w-full h-auto max-h-96 object-contain mb-4 rounded"
      />
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
      <p className="mb-2">{movie.description}</p>
      <p className="mb-2">Genre: {movie.genre}</p>
      <p className="mb-2">Release Date: {movie.releaseDate}</p>
      <p className="mb-2">Rating: {movie.rating}</p>
      <p className="mb-2">Director: {movie.director}</p>
      <p className="mb-2">Duration: {movie.duration}</p>
    </div>
  );
};

export default MovieDetails;

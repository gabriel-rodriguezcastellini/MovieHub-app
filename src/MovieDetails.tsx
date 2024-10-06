import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "./api/movieService";
import { createTicket } from "./api/ticketService";
import { getShowtimes } from "./api/showtimeService";

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

interface Seat {
  row: number;
  number: number;
  isSelected: boolean;
}

interface Showtime {
  _id: string;
  startTime: string;
  endTime: string;
  price: number;
  movieId: string;
  screenId: string;
}

const MovieDetails: React.FC = () => {
  const initialSeats: Seat[][] = Array.from({ length: 10 }, (_, row) =>
    Array.from({ length: 10 }, (_, number) => ({
      row,
      number,
      isSelected: false,
    }))
  );
  const [seats, setSeats] = useState<Seat[][]>(initialSeats);
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieData = (await getMovieById(id!)) as Movie;
      setMovie(movieData);
    };

    const fetchShowtimes = async () => {
      const showtimesData = (await getShowtimes(id!)) as Showtime[];
      setShowtimes(showtimesData);
    };

    fetchMovieDetails();
    fetchShowtimes();
  }, [id]);

  const handlePurchase = async () => {
    if (!selectedShowtime) {
      setErrorMessage("Please select a showtime.");
      return;
    }

    if (selectedSeats.length === 0) {
      setErrorMessage("Please select at least one seat.");
      return;
    }

    try {
      await createTicket({
        showtimeId: selectedShowtime,
        seats: selectedSeats,
      });
      setErrorMessage("");
      alert("Tickets purchased successfully!");
    } catch {
      setErrorMessage("Failed to purchase tickets. Please try again.");
    }
  };

  const handleSeatClick = (row: number, number: number) => {
    const updatedSeats = seats.map((seatRow) =>
      seatRow.map((seat) =>
        seat.row === row && seat.number === number
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );
    setSeats(updatedSeats);

    const updatedSelectedSeats = updatedSeats
      .flat()
      .filter((seat) => seat.isSelected);
    setSelectedSeats(updatedSelectedSeats);
  };

  const formatDateTime = (dateTime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateTime));
  };

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

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Select Showtime</h2>
        <select
          value={selectedShowtime}
          onChange={(e) => setSelectedShowtime(e.target.value)}
          className="border rounded p-2 mb-4 w-full"
        >
          <option value="">Select a showtime</option>
          {showtimes.map((showtime) => (
            <option key={showtime._id} value={showtime._id}>
              {formatDateTime(showtime.startTime)} -{" "}
              {formatDateTime(showtime.endTime)}
            </option>
          ))}
        </select>

        <h2 className="text-2xl font-semibold mb-4">Select Seats</h2>
        <div className="text-center mb-4">
          <div className="inline-block bg-gray-300 p-2 rounded">
            <p className="text-lg font-semibold">Screen</p>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-2">
          {seats.map((seatRow, rowIndex) =>
            seatRow.map((seat, seatIndex) => (
              <button
                key={`${rowIndex}-${seatIndex}`}
                onClick={() => handleSeatClick(seat.row, seat.number)}
                className={`p-2 border rounded ${
                  seat.isSelected ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {seat.row + 1}-{seat.number + 1}
              </button>
            ))
          )}
        </div>
        <button
          onClick={handlePurchase}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Purchase
        </button>
        {errorMessage && (
          <p className="mt-4 text-lg text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;

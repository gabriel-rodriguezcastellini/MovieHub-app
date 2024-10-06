import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const getShowtimes = async (movieId: string) => {
  const response = await axios.get(`${API_BASE_URL}/showtimes`, {
    params: { movieId },
  });
  return response.data;
};

export const getShowtimeById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/showtimes/${id}`);
  return response.data;
};

export const createShowtime = async (showtimeData: object) => {
  const response = await axios.post(`${API_BASE_URL}/showtimes`, showtimeData);
  return response.data;
};

export const updateShowtime = async (id: string, showtimeData: object) => {
  const response = await axios.put(
    `${API_BASE_URL}/showtimes/${id}`,
    showtimeData
  );
  return response.data;
};

export const deleteShowtime = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/showtimes/${id}`);
  return response.data;
};

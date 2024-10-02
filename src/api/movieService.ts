import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const getMovies = async () => {
  const response = await axios.get(`${API_BASE_URL}/movies`);
  return response.data;
};

export const getMovieById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
  return response.data;
};

export const createMovie = async (movieData: object) => {
  const response = await axios.post(`${API_BASE_URL}/movies`, movieData);
  return response.data;
};

export const updateMovie = async (id: string, movieData: object) => {
  const response = await axios.put(`${API_BASE_URL}/movies/${id}`, movieData);
  return response.data;
};

export const deleteMovie = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/movies/${id}`);
  return response.data;
};

export interface Movie {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const getScreens = async () => {
  const response = await axios.get(`${API_BASE_URL}/screens`);
  return response.data;
};

export const getScreenById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/screens/${id}`);
  return response.data;
};

export const createScreen = async (screenData: object) => {
  const response = await axios.post(`${API_BASE_URL}/screens`, screenData);
  return response.data;
};

export const updateScreen = async (id: string, screenData: object) => {
  const response = await axios.put(`${API_BASE_URL}/screens/${id}`, screenData);
  return response.data;
};

export const deleteScreen = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/screens/${id}`);
  return response.data;
};

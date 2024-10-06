import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const getTickets = async () => {
  const response = await axios.get(`${API_BASE_URL}/tickets`);
  return response.data;
};

export const getTicketById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/tickets/${id}`);
  return response.data;
};

export const createTicket = async (ticketData: object) => {
  const response = await axios.post(`${API_BASE_URL}/tickets`, ticketData);
  return response.data;
};

export const updateTicket = async (id: string, ticketData: object) => {
  const response = await axios.put(`${API_BASE_URL}/tickets/${id}`, ticketData);
  return response.data;
};

export const deleteTicket = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/tickets/${id}`);
  return response.data;
};

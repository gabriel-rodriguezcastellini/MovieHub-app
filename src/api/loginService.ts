import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export interface AuthResponse {
  idToken: string;
}

export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email: username,
      password,
    });
    return response.data as AuthResponse;
  } catch {
    throw new Error("Login failed");
  }
};

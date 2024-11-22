import axios, { InternalAxiosRequestConfig } from "axios";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const getUserToken = async () => {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const token = await getIdToken(user);
        resolve(token);
      } else {
        resolve(null);
      }
      unsub();
    });
  });
};

const refreshToken = async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser) {
    return await currentUser.getIdToken(true);
  }

  return null;
};

api.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const token = getUserToken();
    if (token) {
      if (!request.headers) {
        request.headers = {} as InternalAxiosRequestConfig["headers"];
      }
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newToken = await refreshToken();

      if (newToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

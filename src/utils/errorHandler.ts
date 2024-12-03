import { isAxiosError } from "axios";

export const handleAxiosError = (error: unknown) => {
  if (isAxiosError(error) && error.response && error.response.status === 400) {
    return error.response.data.message;
  }
  return "An unexpected error occurred";
};

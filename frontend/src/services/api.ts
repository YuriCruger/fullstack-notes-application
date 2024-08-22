import axios from "axios";

export interface AxiosError extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

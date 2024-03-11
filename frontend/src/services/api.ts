import axios from "axios";

export interface AxiosError extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const api = axios.create({
  baseURL: "https://node-3s0q.onrender.com",
});

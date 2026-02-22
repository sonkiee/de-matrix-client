import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const e = error.response?.data?.message || "Unknown error";
      // console.error("API Error:", e);
      return Promise.reject(new Error(e));
    }
    return Promise.reject("Unexpected error");
  },
);

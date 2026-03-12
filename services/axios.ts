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
    const status = error?.response?.status;

    if (status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      window.dispatchEvent(
        new CustomEvent("auth:required", {
          detail: { status },
        }),
      );
      console.log(
        "Unauthorized access detected, dispatching auth:required event",
      );
    }

    if (axios.isAxiosError(error)) {
      const e = error.response?.data?.message || "Unknown error";
      // console.error("API Error:", e);
      return Promise.reject(new Error(e));
    }
    return Promise.reject("Unexpected error");
  },
);

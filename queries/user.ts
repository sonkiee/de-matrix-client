"use client";

import { api } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get("/users/profile");
      return response.data;
    },
  });
};

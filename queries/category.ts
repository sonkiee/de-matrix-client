"use client";

import { api } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await api.get(`/categories`);
      return response.data;
    },
  });
};

"use client";

import { api } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await api.get(`/categories`);
      return response.data;
    },
  });
};

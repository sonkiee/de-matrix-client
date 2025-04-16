"use client";

import { api } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useFeatured = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products?filter=featured");
      return response.data;
    },
  });
};

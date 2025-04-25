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

export const useAddAddress = () => {
  return useQuery({
    queryKey: ["addAddress"],
    queryFn: async ({ address }) => {
      const response = await api.post("/users/profile/addresses", {
        address,
      });
      return response.data;
    },
  });
};

export const useGetAddress = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await api.get("/users/profile/addresses");
      console.log("response from api", response);
      return response;
    },
  });
};

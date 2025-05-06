"use client";

import { api } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get("/user/profile");
      return response.data;
    },
  });
};

export const useGetAddress = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await api.get("/user/profile/address");
      console.log("response from api", response);
      return response;
    },
  });
};

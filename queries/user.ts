"use client";

import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
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

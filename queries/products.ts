import { api } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products");
      return response;
    },
  });
};

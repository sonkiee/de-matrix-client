import { useQuery } from "@tanstack/react-query";

export const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      return response.json();
    },
  });
};

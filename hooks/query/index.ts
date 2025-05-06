import { api } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderHistory = () => {
  return useQuery({
    queryKey: ["user", "orderHistory"],
    queryFn: async () => {
      const response = await api.get("/user/order");
      return response.data;
    },
  });
};

export const useGetOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ["user", "orderHistoryDetail", orderId],
    queryFn: async () => {
      const response = await api.get(`/user/order/${orderId}`);
      return response.data;
    },
    enabled: !!orderId, // optional but useful to avoid firing when ID is not yet available
  });
};

export const useGetProductById = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await api.get(`/product/${productId}`);
      return response.data;
    },
    enabled: !!productId,
  });
};

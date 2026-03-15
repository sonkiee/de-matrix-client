import { api } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get("/admin/orders");
      return response.data;
    },
  });
};

export const useListPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await api.get("/admin/payments");
      return response.data;
    },
  });
};

export const useListUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get("/admin/users");
      return response.data;
    },
  });
};

export const useListProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/admin/products");
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

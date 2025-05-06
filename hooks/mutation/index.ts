import { api } from "@/services/axiosInstance";
import { useMutation } from "@tanstack/react-query";

// Create Address Hook
export const useCreateAddress = () => {
  return useMutation({
    mutationFn: async (form: {
      address: string;
      city: string;
      state: string;
      zip: string;
      country: string;
      shippingMethod?: string;
      saveAddress?: boolean;
    }) => {
      console.log("sending form", form);
      const response = await api.post("/user/address", form);
      return response.data;
    },
    onSuccess: (response) => {
      console.log("Address created successfully", response);
    },
    onError: (error) => {
      console.log("Error creating address", error);
    },
  });
};

// Create Order Hook
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderPayload: {
      shippingAddress: string | null;
      products: { productId: string; quantity: number }[];
    }) => {
      console.log("creating order", orderPayload);
      const response = await api.post("/user/order", orderPayload);
      return response.data;
    },
    onSuccess: (response) => {
      console.log("Order created successfully", response); // ✅ fixed message
    },
    onError: (error) => {
      console.log("Error creating order", error);
    },
  });
};

export const usePlaceOrder = () => {
  return useMutation({
    mutationFn: async (orderId) => {
      const response = await api.post("/order/payment/init", { orderId });
      return response.data;
    },
    onSuccess: (response) => {
      console.log("Payment successfully", response); // ✅ fixed message
    },
    onError: (error) => {
      console.log("Error placing order", error);
    },
  });
};

"use client";

import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchProductById = (id: string) => {
  return useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
  });
};

export const useFeatured = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products?filter=featured");
      return response.data;
    },
  });
};

export const useProductBycategory = ({ slug }: { slug: string }) => {
  console.log("Hook called with category:", slug); // ✅ Debug input

  return useQuery({
    queryKey: ["productsByCategory", slug],
    queryFn: async ({ queryKey }) => {
      const [, categoryName] = queryKey;
      console.log("Querying API for category:", categoryName); // ✅ Check query key
      const response = await api.get(`/categories/name/${categoryName}`);
      return response.data;
    },
    enabled: !!slug, // prevent running when category is undefined
  });
};

export const useListProducts = (filter: any) => {
  const qs = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined) {
      qs.append(key, String(value));
    }
  });
  console.log("Fetching products with params:", qs); // ✅ Debug input
  return useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      const response = await api.get(`/products?${qs.toString()}`);
      return response.data;
    },
  });
};

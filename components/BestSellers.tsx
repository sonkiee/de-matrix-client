"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { AddToCartButton } from "./add-to-cart-bitton";
import { useFeatured } from "@/queries/products";
import { naira } from "@/utils/formatCurrency";
import { Spinner } from "./Spinner";
import { Product } from "@/types";

export function BestSellers() {
  const { data, isLoading, isError } = useFeatured();
  const isFeatured = data?.data;

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Best Sellers
          </h3>
          <div className="flex justify-center items-center">
            <Spinner /> {/* Replace with your spinner/loading indicator */}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Best Sellers
          </h3>
          <div className="text-center text-red-500">
            <p>Error loading products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Best Sellers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isFeatured?.map((product: Product, index: number) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <Image
                  src={`/placeholder.svg?height=200&width=300&text=${product.name}`}
                  alt={`Image of ${product.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-blue-600 font-bold">
                  {naira(product.price)}
                </p>
                <AddToCartButton
                  product={product}
                  className="w-full mt-2 bg-orange-500 hover:bg-orange-600"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

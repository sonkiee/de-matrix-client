import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Product } from "@/types";
import { naira } from "@/utils/naira";
import { use } from "react";
import { useRouter } from "next/navigation";
import { images } from "@/constants";

export default function ProductCard({ product }: { product: Product }) {
  const r = useRouter();
  return (
    <Card
      onClick={() => r.push(`/product/${product.id}`)}
      className="group shadow-none py-0 flex flex-col overflow-hidden rounded-xl border bg-surface-light transition-all duration-300 hover:border-gray-200 hover:shadow-soft dark:bg-surface-dark dark:hover:border-gray-700 "
    >
      {/* Image Section */}
      <div className="relative flex h-64 w-full items-center justify-center bg-gray-50 p-8 dark:bg-gray-800">
        {product.isNewArrival && (
          <Badge className="absolute left-4 top-4 bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            New
          </Badge>
        )}

        {product.discount > 0 && (
          <Badge className="absolute right-4 top-4 bg-rose-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {product.discount}% OFF
          </Badge>
        )}
        <Image
          src={product?.images?.[0]?.url || "/placeholder.svg"}
          alt={product?.title ?? "Product Image"}
          width={300}
          height={300}
          className="h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 dark:mix-blend-normal"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-1 text-lg font-semibold text-text-light dark:text-text-dark">
          {product.title}
        </h3>

        <p className="mb-1 text-xs text-text-muted-light dark:text-text-muted-dark">
          {product?.brand?.name ?? "Unknown Brand"}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex">
            {product.minPrice !== product.maxPrice ? (
              <span className="text-lg font-bold text-text-light dark:text-text-dark">
                {naira(product?.minPrice ?? 0)} –{" "}
                {naira(product?.maxPrice ?? 0)}
              </span>
            ) : (
              <span className="text-lg font-bold text-text-light dark:text-text-dark">
                {naira(product?.minPrice ?? 0)}
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-100 p-2.5 transition-colors duration-200 hover:bg-primary hover:text-white group-hover:shadow-md dark:bg-gray-800 dark:hover:bg-white dark:hover:text-primary"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useProductBycategory } from "@/queries/products";
import { use } from "react";
import { Product } from "@/types";
import Filter from "../molecules/filter";
// import { use } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = ({ params }: PageProps) => {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const { data = [], isLoading, error } = useProductBycategory({ slug });

  console.log("slug from params", slug);

  // This would normally come from a database or API
  // const products = getProductsByCategory(slug);
  const products = data?.category?.products;
  console.log(products);

  // if (isLoading) return <p>Loading...</p>;

  // if (error) return <p>Error loading products: {String(error)}</p>;

  console.log("products fethced", data);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-8 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">{categoryName}</span>
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight">
              {categoryName}
            </h1>
            <p className="mt-2 text-muted-foreground">{getDescription(slug)}</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
            {/* Filters Sidebar */}

            <Filter />

            {/* Product Grid */}
            <div className="space-y-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-muted-foreground">
                  Showing <strong>{products?.length ?? 0}</strong> products
                </p>
                <div className="flex items-center gap-2">
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product: Product, index: number) => (
                  <Link
                    key={index}
                    href={`/store/product/${product._id}`}
                    className="group"
                  >
                    <Card className="overflow-hidden">
                      <div className="relative aspect-square overflow-hidden">
                        {product.isNew && (
                          <Badge className="absolute left-2 top-2 z-10">
                            New
                          </Badge>
                        )}
                        {product.discount > 0 && (
                          <Badge className="absolute right-2 top-2 z-10 bg-rose-500 hover:bg-rose-600">
                            {product.discount}% OFF
                          </Badge>
                        )}
                        <Image
                          src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(
                            product.name,
                          )}`}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          Quick View
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {product.brand}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span className="sr-only">Add to cart</span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div> */}

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mx-2">
                  Previous
                </Button>
                <Button variant="outline" className="mx-2">
                  1
                </Button>
                <Button className="mx-2">2</Button>
                <Button variant="outline" className="mx-2">
                  3
                </Button>
                <Button variant="outline" className="mx-2">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;

function getBrands(category: string) {
  switch (category) {
    case "smartphones":
      return ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"];
    case "laptops":
      return ["Apple", "Dell", "HP", "Lenovo", "ASUS"];
    case "tablets":
      return ["Apple", "Samsung", "Microsoft", "Lenovo", "Amazon"];
    case "accessories":
      return ["Anker", "Belkin", "Logitech", "JBL", "Sony"];
    case "parts":
      return ["Samsung", "Western Digital", "Corsair", "Kingston", "Seagate"];
    default:
      return ["Generic Brand"];
  }
}

function getDescription(category: string) {
  switch (category) {
    case "smartphones":
      return "Discover the latest smartphones with cutting-edge technology, stunning cameras, and powerful performance.";
    case "laptops":
      return "Browse our selection of high-performance laptops for work, gaming, and everyday use.";
    case "tablets":
      return "Find the perfect tablet for entertainment, productivity, or creativity.";
    case "accessories":
      return "Enhance your tech experience with our range of accessories, from headphones to chargers and more.";
    case "parts":
      return "Upgrade your devices with quality components and replacement parts.";
    default:
      return "Browse our selection of products.";
  }
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchProductById } from "@/queries/product";

import { useParams } from "next/navigation";

import { ProductVariantSelector } from "../molecules/product-varient-selctor";

export default function ProductPage() {
  const p = useParams();
  const { id } = p;

  const { data, error, isLoading } = useFetchProductById(id as string);

  // This would normally come from a database or API
  const product = data?.data;

  console.log("fetched", product);

  if (!product) {
    return <div className="container py-8"> Product not found </div>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product: {String(error)}</p>;

  return (
    <div className="flex min-h-screen flex-col">
      {product && (
        <main className="flex-1 px-8 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/category/${product.categoryId}`}
              className="hover:text-foreground"
            >
              {/* {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)} */}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">
              {product?.title ?? "Product Details"}
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border">
                <Image
                  src={`/placeholder.svg?height=600&width=600&text=${encodeURIComponent(
                    product?.title ?? "Product",
                  )}`}
                  alt={product?.title ?? "Product"}
                  width={600}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-lg border">
                    <Image
                      src={`/placeholder.svg?height=150&width=150&text=${encodeURIComponent(
                        `View ${i + 1}`,
                      )}`}
                      alt={`${product.name} view ${i + 1}`}
                      width={150}
                      height={150}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product?.title}</h1>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < product.rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  <Badge
                    variant={
                      product.stock > 10
                        ? "outline"
                        : product.stock > 0
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {product.stock > 10
                      ? "In Stock"
                      : product.stock > 0
                        ? "Low Stock"
                        : "Out of Stock"}
                  </Badge>
                </div>
              </div>

              <ProductVariantSelector product={product} />

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Delivery</h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="standard">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select delivery option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        Standard Delivery (3-5 days) - Free
                      </SelectItem>
                      <SelectItem value="express">
                        Express Delivery (1-2 days) - $9.99
                      </SelectItem>
                      <SelectItem value="nextday">
                        Next Day Delivery - $14.99
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="specifications">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Details</h3>
                    <Separator className="my-2" />

                    <dl className="grid grid-cols-2 gap-2 text-sm">
                      <dt className="text-muted-foreground">Brand</dt>
                      <dd>Apple</dd>

                      <dt className="text-muted-foreground">Model</dt>
                      <dd>iPhone 15 Pro</dd>

                      <dt className="text-muted-foreground">Storage</dt>
                      <dd>128 GB</dd>

                      <dt className="text-muted-foreground">RAM</dt>
                      <dd>6 GB</dd>

                      <dt className="text-muted-foreground">Processor</dt>
                      <dd>A16 Bionic</dd>

                      <dt className="text-muted-foreground">Display</dt>
                      <dd>6.1&rdquo; OLED</dd>

                      <dt className="text-muted-foreground">Rear Camera</dt>
                      <dd>48 MP</dd>

                      <dt className="text-muted-foreground">Battery</dt>
                      <dd>3500 mAh</dd>

                      <dt className="text-muted-foreground">Warranty</dt>
                      <dd>1 Year</dd>
                    </dl>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl,
                    eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel
                    ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl
                    nisl sit amet nisl.
                  </p>
                  <h3>Key Features</h3>
                  <ul>
                    <li>High-performance processor for smooth multitasking</li>
                    <li>
                      Stunning display with vibrant colors and deep blacks
                    </li>
                    <li>Long-lasting battery life for all-day use</li>
                    <li>Premium build quality with attention to detail</li>
                    <li>
                      Advanced camera system for capturing life&apos;s moments
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Customer Reviews
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < product.rating
                                  ? "fill-primary text-primary"
                                  : "fill-muted text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span>Based on {product.reviews} reviews</span>
                      </div>
                    </div>
                    <Button>Write a Review</Button>
                  </div>

                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Image
                              src={`/placeholder.svg?height=40&width=40&text=User`}
                              alt="User"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <h4 className="font-medium">John Doe</h4>
                              <p className="text-sm text-muted-foreground">
                                Verified Purchase
                              </p>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            2 weeks ago
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${
                                j < 4 + (i % 2)
                                  ? "fill-primary text-primary"
                                  : "fill-muted text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <h5 className="font-medium">
                          Great product, highly recommend!
                        </h5>
                        <p className="text-muted-foreground">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed euismod, nisl vel ultricies lacinia, nisl
                          nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                          Sed euismod, nisl vel ultricies lacinia, nisl nisl
                          aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Helpful
                          </Button>
                          <Button variant="outline" size="sm">
                            Report
                          </Button>
                        </div>
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button variant="outline">Load More Reviews</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* <div className="mt-12">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {[...Array(5)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/product/${product?.category}-${i + 1}`}
                    className="group"
                  >
                    <div className="overflow-hidden rounded-lg border bg-background">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(
                            `Related ${i + 1}`,
                          )}`}
                          alt={`Related product ${i + 1}`}
                          width={200}
                          height={200}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">
                          {product?.brand ?? "Unknown Brand"} Product {i + 1}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {product?.category ?? "Category"}
                        </p>
                        <div className="mt-2 font-semibold">
                          $
                          {(product?.price * 0.8 + i * 10).toFixed(2) ??
                            "$99.99"}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div> */}
        </main>
      )}
    </div>
  );
}

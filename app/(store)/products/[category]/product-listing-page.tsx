"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronRight, FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Filter from "../molecules/filter";
import ProductCard from "@/components/product-card";
import { useListProducts } from "@/queries/product";
import type { Product } from "@/types";
import Breadcrumb from "@/components/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type SortKey = "featured" | "price-low" | "price-high" | "newest" | "rating";

export default function ProductListingPage() {
  const params = useParams();
  const category =
    typeof params?.category === "string" ? params.category : undefined;

  const [filter, setFilter] = useState({
    storage: undefined,
    category: category,
  });

  const { data: p = [], isLoading, error } = useListProducts(filter);

  console.log("Category:", category);
  console.log("API Response:", p.data);

  // If your API returns { products: Product[] } adjust here.
  // For now: assume `data` might already be an array.
  const apiProducts = Array.isArray(p?.data) ? (p?.data as Product[]) : [];

  const products: Product[] = apiProducts.length ? apiProducts : [];

  const [sort, setSort] = useState<SortKey>("featured");

  const sortedProducts = useMemo(() => {
    const arr = [...products];

    switch (sort) {
      case "price-low":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // If you have createdAt, use it. Otherwise prefer isNew first.
        arr.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
        break;
      case "rating":
        // If you have rating, use it. Otherwise keep as-is.
        break;
      case "featured":
      default:
        // Keep as-is (API order)
        break;
    }

    return arr;
  }, [products, sort]);

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Title */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight capitalize">
            {category}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {getDescription(category)}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[200px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <Filter filter={filter} setFilter={setFilter} />
          </aside>
          {/* Grid */}
          <section className="space-y-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-muted-foreground">
                {isLoading ? (
                  "Loading products..."
                ) : (
                  <>
                    Showing <strong>{sortedProducts.length}</strong> products
                  </>
                )}
              </p>

              <div className="flex items-center gap-2">
                <Select
                  value={sort}
                  onValueChange={(v) => setSort(v as SortKey)}
                >
                  <SelectTrigger className="w-48">
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

            {error ? (
              <div className="rounded-lg border p-4 text-sm">
                Failed to load products. Using fallback list.
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination (static placeholder UI) */}
            <div className="mt-8 flex justify-center gap-2">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">1</Button>
              <Button>2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function getDescription(category: string) {
  switch (category) {
    case "smartphone":
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

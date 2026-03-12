"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product-card";
import { useListProducts } from "@/queries/product";
import type { Product } from "@/types";

type SortKey = "featured" | "price-low" | "price-high" | "newest" | "rating";

const ALLOWED_CATEGORIES = new Set(["iphone", "samsung", "accessories"]);

export default function ProductListing({
  categorySlug,
}: {
  categorySlug?: string;
}) {
  const sp = useSearchParams();

  const condition = sp.get("condition"); // new|used|refurbished|nigerian_used
  const brand = sp.get("brand"); // apple|samsung|oraimo etc (optional)
  const device = sp.get("device"); // ipad etc (optional alias)

  const { data: p, isLoading, error } = useListProducts();
  const apiProducts = Array.isArray(p?.data) ? (p?.data as Product[]) : [];

  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let arr = [...apiProducts];

    // category filter (path)
    if (categorySlug) {
      // if invalid, return empty (your page can 404 before rendering this)
      arr = arr.filter((x) => x.categorySlug === categorySlug);
    }

    // optional filters (query string) — adjust fields to match your Product type
    if (brand) arr = arr.filter((x) => x.brandSlug === brand);
    if (condition) arr = arr.filter((x) => x.condition === condition);

    // alias example: iPad
    if (device === "ipad")
      arr = arr.filter((x) => x.model?.toLowerCase().includes("ipad"));

    // sort
    switch (sort) {
      case "price-low":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        arr.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
        break;
    }

    return arr;
  }, [apiProducts, categorySlug, brand, condition, device, sort]);

  // render same UI as your current page using `filtered`
  // ...
  return (
    <div>
      {isLoading ? "Loading..." : null}
      {error ? "Failed to load" : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

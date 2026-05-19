"use client";

import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { naira } from "@/utils/naira";
import { Product, ProductVariant } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";

export function ProductVariantSelector({ product }: { product: Product }) {
  const add = useCartStore((state) => state.add);

  // Only consider active variants (optional but recommended)
  const activeVariants = useMemo(
    () => product.variants.filter((v) => v.isActive),
    [product.variants],
  );

  // option lists
  const colors = useMemo(
    () =>
      [
        ...new Set(activeVariants.map((v) => v.color).filter(Boolean)),
      ] as string[],
    [activeVariants],
  );

  const storages = useMemo(
    () =>
      [
        ...new Set(
          activeVariants
            .map((v) => v.storage)
            .filter((x): x is number => typeof x === "number"),
        ),
      ].sort((a, b) => a - b),
    [activeVariants],
  );

  const conditions = useMemo(
    () => [...new Set(activeVariants.map((v) => v.condition))],
    [activeVariants],
  );

  const [qty, setQty] = useState(1);
  // selection state
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<
    ProductVariant["condition"] | null
  >(null);

  // optional: set sensible defaults when product loads
  useEffect(() => {
    if (!activeVariants.length) return;

    // default to first available condition
    if (selectedCondition == null) setSelectedCondition(conditions[0] ?? null);

    // default storage/color if only one exists
    if (selectedStorage == null && storages.length === 1)
      setSelectedStorage(storages[0]);
    if (selectedColor == null && colors.length === 1)
      setSelectedColor(colors[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVariants.length, conditions, storages, colors]);

  // resolved variant
  const selectedVariant = useMemo(() => {
    return activeVariants.find(
      (v) =>
        (selectedColor == null || (v.color ?? null) === selectedColor) &&
        (selectedStorage == null || (v.storage ?? null) === selectedStorage) &&
        (selectedCondition == null || v.condition === selectedCondition),
    );
  }, [activeVariants, selectedColor, selectedStorage, selectedCondition]);

  const priceText = selectedVariant
    ? naira(Number(selectedVariant.price))
    : product.minPrice && product.maxPrice
      ? product.minPrice === product.maxPrice
        ? naira(Number(product.minPrice))
        : `${naira(Number(product.minPrice))} - ${naira(Number(product.maxPrice))}`
      : "—";

  const onSubmit = () => {
    if (!selectedVariant) return;

    add(
      {
        productId: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        price: Number(selectedVariant.price),

        image: product.images[0]?.url,
        //   condition: selectedVariant.condition,
        storage: selectedVariant.storage ?? undefined,
        color: selectedVariant.color ?? undefined,
      },
      qty,
    );

    toast.success("Added to cart!");
  };

  return (
    <div className="space-y-4">
      {/* Price */}
      <div className="text-2xl font-bold">{priceText}</div>

      <Separator />

      {/* Condition */}
      {conditions.length > 0 && (
        <div className="space-y-2">
          <div className="font-medium">Condition</div>
          <div className="flex flex-wrap gap-2">
            {conditions.map((c) => (
              <Button
                key={c}
                type="button"
                variant={selectedCondition === c ? "default" : "outline"}
                onClick={() => setSelectedCondition(c)}
              >
                {c.replace("_", " ")}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Storage */}
      {storages.length > 0 && (
        <div className="space-y-2">
          <div className="font-medium">Storage</div>
          <div className="flex flex-wrap gap-2">
            {storages.map((s) => (
              <Button
                key={s}
                type="button"
                variant={selectedStorage === s ? "default" : "outline"}
                onClick={() => setSelectedStorage(s)}
              >
                {s}GB
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Color */}
      {colors.length > 0 && (
        <div className="space-y-2">
          <div className="font-medium">Color</div>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <Button
                key={c}
                type="button"
                variant={selectedColor === c ? "default" : "outline"}
                onClick={() => setSelectedColor(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="text-sm">
        {selectedVariant ? (
          selectedVariant.stockQty > 0 ? (
            <span>In stock ({selectedVariant.stockQty})</span>
          ) : (
            <span>Out of stock</span>
          )
        ) : (
          <span>Select options to see availability</span>
        )}
      </div>

      <div>
        <h3 className="mb-2 font-medium">Quantity</h3>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-r-none"
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex h-10 w-12 items-center justify-center border-y">
            1
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-l-none"
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>

      {/* You will use this for cart */}
      {/* Example: disable until variant resolved */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          size={"lg"}
          onClick={onSubmit}
          disabled={!selectedVariant || selectedVariant.stockQty <= 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <Heart className="h-5 w-5" />
          Wishlist
        </Button>
        <Button variant="outline">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share</span>
        </Button>
      </div>

      {/* If you need the variantId for cart: */}
      {/* selectedVariant?.id */}
    </div>
  );
}

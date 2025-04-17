"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    variant?: string;
  };
  quantity?: number;
  className?: string;
  showIcon?: boolean;
}

export function AddToCartButton({
  product,
  quantity = 1,
  className = "",
  showIcon = true,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        variant: product.variant,
      });

      toast("Added to cart", {
        description: `${product.name} has been added to your cart.`,
      });

      setIsAdding(false);
    }, 500);
  };

  return (
    <Button onClick={handleAddToCart} disabled={isAdding} className={className}>
      {showIcon && <ShoppingCart className="mr-2 h-4 w-4" />}
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  );
}

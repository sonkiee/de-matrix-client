"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

interface AddToCartButtonProps {
  product: {
    id: string;
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
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        variant: product.variant,
      });

      toast({
        title: "Added to cart",
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

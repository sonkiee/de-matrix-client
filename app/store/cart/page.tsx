"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 9.99 : 0;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-8 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">Shopping Cart</span>
          </div>

          <h1 className="mt-6 text-3xl font-bold">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-muted p-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p className="text-muted-foreground">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button asChild className="mt-4">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-lg border">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold">
                      Cart Items ({cart.length})
                    </h2>
                  </div>
                  <Separator />
                  {cart.map((item) => (
                    <div key={item.id} className="group">
                      <div className="flex items-start gap-4 p-6">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border">
                          <Image
                            src={
                              item.image ||
                              `/placeholder.svg?height=96&width=96&text=${encodeURIComponent(
                                item.name
                              )}`
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex justify-between">
                            <Link
                              href={`/product/${item.id}`}
                              className="font-medium hover:underline"
                            >
                              {item.name}
                            </Link>
                            <div className="font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.variant || "Standard"}
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-r-none"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease</span>
                              </Button>
                              <div className="flex h-8 w-10 items-center justify-center border-y text-sm">
                                {item.quantity}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-l-none"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                  <div className="flex justify-between p-6">
                    <Button variant="outline" asChild>
                      <Link href="/">Continue Shopping</Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        cart.forEach((item) => removeFromCart(item.id))
                      }
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold">Order Summary</h2>
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount (10%)</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button variant="outline" onClick={handleApplyPromo}>
                          Apply
                        </Button>
                      </div>
                      {promoApplied && (
                        <div className="text-sm text-green-600">
                          Promo code "DISCOUNT10" applied successfully!
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 p-6 pt-0">
                    <Button className="w-full" asChild>
                      <Link href="/store/checkout">Proceed to Checkout</Link>
                    </Button>
                    <div className="mt-4 text-center text-xs text-muted-foreground">
                      By proceeding to checkout, you agree to our{" "}
                      <Link href="/terms" className="underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="underline">
                        Privacy Policy
                      </Link>
                      .
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, CreditCard, Lock, Truck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/cart-context";
import { useUser } from "@/queries/user";
import Shipping from "./components/Shipping";
import Payment from "./components/Payment";
import Review from "./components/Review";
import OrderSummary from "./components/OrderSummary";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { data } = useUser();
  const user = data?.user;
  const [step, setStep] = useState("shipping");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 9.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-8 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/cart" className="hover:text-foreground">
              Cart
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">Checkout</span>
          </div>

          <h1 className="mt-6 text-3xl font-bold">Checkout</h1>

          <div className="mt-8">
            <Tabs value={step} onValueChange={setStep} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="shipping"
                  className="flex items-center gap-2"
                >
                  <Truck className="h-4 w-4" />
                  <span className="hidden sm:inline">Shipping</span>
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Payment</span>
                </TabsTrigger>
                <TabsTrigger value="review" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Review</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-8 grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Shipping setStep={setStep} user={user} />

                  <Payment setStep={setStep} />

                  <Review setStep={setStep} cart={cart} />
                </div>

                <div>
                  <OrderSummary
                    cart={cart}
                    subtotal={subtotal}
                    shipping={shipping}
                    tax={tax}
                    total={total}
                  />
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

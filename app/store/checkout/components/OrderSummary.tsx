import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

interface OrderSummaryProps {
  cart: { id: string; name: string; price: number; quantity: number }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderSummary = ({
  cart,
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div className="mt-4 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;

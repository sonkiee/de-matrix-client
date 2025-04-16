"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, CreditCard, Lock, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/cart-context";

export default function CheckoutPage() {
  const { cart } = useCart();
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
        <div className="container py-8">
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
                  <TabsContent value="shipping" className="mt-0">
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold">
                          Shipping Information
                        </h2>
                        <div className="mt-4 grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="first-name">First Name</Label>
                              <Input id="first-name" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input id="last-name" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input id="city" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              <Select>
                                <SelectTrigger id="state">
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ca">California</SelectItem>
                                  <SelectItem value="ny">New York</SelectItem>
                                  <SelectItem value="tx">Texas</SelectItem>
                                  <SelectItem value="fl">Florida</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="zip">ZIP Code</Label>
                              <Input id="zip" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="country">Country</Label>
                              <Select defaultValue="us">
                                <SelectTrigger id="country">
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="us">
                                    United States
                                  </SelectItem>
                                  <SelectItem value="ca">Canada</SelectItem>
                                  <SelectItem value="uk">
                                    United Kingdom
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="save-address" />
                            <label
                              htmlFor="save-address"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Save this address for future orders
                            </label>
                          </div>
                        </div>

                        <h2 className="mt-8 text-lg font-semibold">
                          Shipping Method
                        </h2>
                        <RadioGroup defaultValue="standard" className="mt-4">
                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="standard" id="standard" />
                              <Label htmlFor="standard" className="font-medium">
                                Standard Shipping
                              </Label>
                            </div>
                            <div className="text-sm">
                              <span className="font-semibold">$9.99</span>
                              <span className="ml-2 text-muted-foreground">
                                (3-5 business days)
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="express" id="express" />
                              <Label htmlFor="express" className="font-medium">
                                Express Shipping
                              </Label>
                            </div>
                            <div className="text-sm">
                              <span className="font-semibold">$19.99</span>
                              <span className="ml-2 text-muted-foreground">
                                (1-2 business days)
                              </span>
                            </div>
                          </div>
                        </RadioGroup>

                        <div className="mt-8 flex justify-end">
                          <Button onClick={() => setStep("payment")}>
                            Continue to Payment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="payment" className="mt-0">
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold">
                          Payment Method
                        </h2>
                        <RadioGroup defaultValue="credit-card" className="mt-4">
                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="credit-card"
                                id="credit-card"
                              />
                              <Label
                                htmlFor="credit-card"
                                className="font-medium"
                              >
                                Credit Card
                              </Label>
                            </div>
                            <div className="flex gap-2">
                              <Image
                                src="/placeholder.svg?height=24&width=36"
                                alt="Visa"
                                width={36}
                                height={24}
                              />
                              <Image
                                src="/placeholder.svg?height=24&width=36"
                                alt="Mastercard"
                                width={36}
                                height={24}
                              />
                              <Image
                                src="/placeholder.svg?height=24&width=36"
                                alt="Amex"
                                width={36}
                                height={24}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="paypal" id="paypal" />
                              <Label htmlFor="paypal" className="font-medium">
                                PayPal
                              </Label>
                            </div>
                            <Image
                              src="/placeholder.svg?height=24&width=72"
                              alt="PayPal"
                              width={72}
                              height={24}
                            />
                          </div>
                        </RadioGroup>

                        <div className="mt-6 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="name-on-card">Name on Card</Label>
                            <Input id="name-on-card" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="save-card" />
                            <label
                              htmlFor="save-card"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Save this card for future payments
                            </label>
                          </div>
                        </div>

                        <div className="mt-8 flex justify-between">
                          <Button
                            variant="outline"
                            onClick={() => setStep("shipping")}
                          >
                            Back to Shipping
                          </Button>
                          <Button onClick={() => setStep("review")}>
                            Review Order
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="review" className="mt-0">
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold">
                          Review Your Order
                        </h2>

                        <div className="mt-6 space-y-6">
                          <div>
                            <h3 className="font-medium">
                              Shipping Information
                            </h3>
                            <div className="mt-2 rounded-lg border p-4 text-sm">
                              <p className="font-medium">John Doe</p>
                              <p>123 Main Street</p>
                              <p>San Francisco, CA 94107</p>
                              <p>United States</p>
                              <p className="mt-2">john.doe@example.com</p>
                              <p>(123) 456-7890</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Payment Method</h3>
                            <div className="mt-2 rounded-lg border p-4 text-sm">
                              <div className="flex items-center justify-between">
                                <p>Credit Card ending in 3456</p>
                                <Image
                                  src="/placeholder.svg?height=24&width=36"
                                  alt="Visa"
                                  width={36}
                                  height={24}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Items</h3>
                            <div className="mt-2 space-y-4 rounded-lg border p-4">
                              {cart.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-4"
                                >
                                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                    <Image
                                      src={
                                        item.image ||
                                        `/placeholder.svg?height=64&width=64&text=${
                                          encodeURIComponent(item.name) ||
                                          "/placeholder.svg"
                                        }`
                                      }
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex flex-1 flex-col">
                                    <span className="font-medium">
                                      {item.name}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      {item.variant || "Standard"} ×{" "}
                                      {item.quantity}
                                    </span>
                                  </div>
                                  <div className="font-medium">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 flex justify-between">
                          <Button
                            variant="outline"
                            onClick={() => setStep("payment")}
                          >
                            Back to Payment
                          </Button>
                          <Button>Place Order</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>

                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold">Order Summary</h2>
                      <div className="mt-4 space-y-4">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                            <span>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Shipping
                          </span>
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
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

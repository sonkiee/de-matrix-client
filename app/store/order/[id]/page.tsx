"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Package,
  Truck,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetOrderDetails } from "@/hooks/query";
import OrderProductItem from "../components/OrderProduct";
// import { useToast } from "@/hooks/use-toast";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = use(params);
  const { data, isLoading } = useGetOrderDetails(id);
  // const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("items");

  // const order = data(id);
  const order = data?.order;

  if (isLoading) return <p>Loading...</p>;

  console.log("order details fetched", order);

  if (!order) {
    return (
      <div className="container flex min-h-screen flex-col items-center justify-center py-8">
        <AlertCircle className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-bold">Order Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn't find the order you're looking for.
        </p>
        <Button asChild className="mt-6">
          <Link href="/account">Back to Account</Link>
        </Button>
      </div>
    );
  }

  const handleCancelOrder = () => {
    // toast({
    //   title: "Cancel request submitted",
    //   description:
    //     "We'll review your cancellation request and get back to you soon.",
    // });
  };

  const handleReturnItems = () => {
    // toast({
    //   title: "Return initiated",
    //   description:
    //     "Your return request has been submitted. Please check your email for next steps.",
    // });
  };

  const handleReorder = () => {
    // toast({
    //   title: "Items added to cart",
    //   description:
    //     "All available items from this order have been added to your cart.",
    // });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-2 px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/account" className="hover:text-foreground">
              My Account
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/account?tab=orders" className="hover:text-foreground">
              Orders
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">Order #{id}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/account?tab=orders">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to orders</span>
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">Order #{id}</h1>
                <p className="text-muted-foreground">
                  Placed on {order.createdAt}
                </p>
              </div>
            </div>
            <Badge
              className={`px-3 py-1 text-sm ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  : order.status === "Processing"
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100"
              }`}
            >
              {order.status}
            </Badge>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs
                defaultValue={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="items">Items</TabsTrigger>
                  <TabsTrigger value="tracking">Tracking</TabsTrigger>
                  <TabsTrigger value="invoice">Invoice</TabsTrigger>
                </TabsList>

                <TabsContent value="items" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Items</CardTitle>
                      <CardDescription>
                        Items included in your order.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {order?.products?.map((item, index) => (
                          <OrderProductItem
                            key={index}
                            productId={item.product}
                            quantity={item.quantity}
                            price={item.price}
                            variant={item.variant}
                            status={order.status}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {order.status === "Delivered" && (
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Button onClick={handleReorder}>Reorder</Button>
                      <Button variant="outline" onClick={handleReturnItems}>
                        Return Items
                      </Button>
                    </div>
                  )}

                  {order.status === "Processing" && (
                    <div className="mt-6">
                      <Button variant="outline" onClick={handleCancelOrder}>
                        Cancel Order
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="tracking" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Tracking</CardTitle>
                      <CardDescription>
                        Track the status of your order.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="absolute left-4 top-0 h-full w-0.5 bg-muted"></div>
                        <div className="space-y-8">
                          {/* {order.timeline.map((event, index) => (
                            <div key={index} className="relative flex gap-4">
                              <div
                                className={`absolute left-4 top-1 h-2 w-2 -translate-x-1/2 rounded-full ${
                                  event.completed
                                    ? "bg-primary"
                                    : "bg-muted-foreground"
                                }`}
                              ></div>
                              <div
                                className={`ml-8 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                                  event.completed
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {event.icon === "package" ? (
                                  <Package className="h-4 w-4" />
                                ) : event.icon === "truck" ? (
                                  <Truck className="h-4 w-4" />
                                ) : event.icon === "check" ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Clock className="h-4 w-4" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{event.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {event.description}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {event.date}
                                </p>
                              </div>
                            </div>
                          ))} */}
                        </div>
                      </div>

                      {/* {order?.trackingNumber && (
                        <div className="mt-8 rounded-lg border p-4">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <h3 className="font-medium">Tracking Number</h3>
                              <p className="text-sm">{order.trackingNumber}</p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={`https://example.com/track/${order.trackingNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Track Package
                              </a>
                            </Button>
                          </div>
                        </div>
                      )} */}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="invoice" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Invoice</CardTitle>
                      <CardDescription>
                        Invoice details for your order.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium">Invoice Number</h3>
                          <p className="text-sm">
                            INV-{id}-
                            {new Date(order.createdAt)
                              .getTime()
                              .toString()
                              .slice(-6)}
                          </p>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h3 className="font-medium">Items</h3>
                          {/* {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-sm">
                                {item.name} × {item.quantity}
                              </span>
                              <span className="text-sm">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))} */}
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Subtotal
                            </span>
                            <span className="text-sm">
                              {/* ${order.subtotal.toFixed(2)} */}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Shipping
                            </span>
                            <span className="text-sm">${order.shipping}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Tax
                            </span>
                            <span className="text-sm">
                              {/* ${order.tax.toFixed(2)} */}
                            </span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span className="text-sm">Discount</span>
                              <span className="text-sm">
                                -${order.discount.toFixed(2)}
                              </span>
                            </div>
                          )}
                        </div>

                        <Separator />

                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          {/* <span>${order.total.toFixed(2)}</span> */}
                        </div>

                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            Download Invoice
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Order Number
                      </span>
                      <span className="font-medium">#{id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date Placed</span>
                      <span>{order.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-medium">
                        {/* ${order.total.toFixed(2)} */}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Payment Method
                      </span>
                      {/* <span>{order.paymentMethod}</span> */}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <div className="space-y-1">
                    <p className="font-medium">{order.shipping.name}</p>
                    <p>{order.shipping.address1}</p>
                    {order.shipping.address2 && (
                      <p>{order.shipping.address2}</p>
                    )}
                    <p>
                      {order.shipping.city}, {order.shipping.state}{" "}
                      {order.shipping.zip}
                    </p>
                    <p>{order.shipping.country}</p>
                    <p className="mt-2">{order.shipping.phone}</p>
                  </div> */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <div className="flex items-center gap-3">
                    <div className="h-10 w-16 rounded bg-muted">
                      <Image
                        src={`/placeholder.svg?height=40&width=64&text=${
                          order.paymentMethod.split(" ")[0]
                        }`}
                        alt={order.paymentMethod}
                        width={64}
                        height={40}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{order.paymentMethod}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.paymentMethod.includes("Card")
                          ? "ending in " + order.paymentLast4
                          : ""}
                      </p>
                    </div>
                  </div>

                  {order.billingAddress && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium">Billing Address</h3>
                      <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                        <p>{order.billingAddress.name}</p>
                        <p>{order.billingAddress.address1}</p>
                        {order.billingAddress.address2 && (
                          <p>{order.billingAddress.address2}</p>
                        )}
                        <p>
                          {order.billingAddress.city},{" "}
                          {order.billingAddress.state}{" "}
                          {order.billingAddress.zip}
                        </p>
                        <p>{order.billingAddress.country}</p>
                      </div>
                    </div>
                  )} */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/support">Contact Support</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/faq">FAQs</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/returns">Return Policy</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getOrderById(id: string) {
  // This would normally come from an API or database
  // Mock data for demonstration
  const orderDate = new Date();
  orderDate.setDate(orderDate.getDate() - 3);

  const isDelivered = parseInt(id) % 4 === 0;
  const isShipped = parseInt(id) % 4 === 1 || isDelivered;
  const isProcessing = parseInt(id) % 4 === 2 || isShipped;
  const isCancelled = parseInt(id) % 4 === 3;

  const status = isDelivered
    ? "Delivered"
    : isShipped
    ? "Shipped"
    : isProcessing
    ? "Processing"
    : "Cancelled";

  const items = [
    {
      id: "smartphone-1",
      name: "iPhone 15 Pro",
      price: 999.99,
      quantity: 1,
      variant: "128GB, Titanium",
      image: "/placeholder.svg?height=96&width=96&text=iPhone",
    },
    {
      id: "accessory-2",
      name: "AirPods Pro",
      price: 249.99,
      quantity: 1,
      variant: "White",
      image: "/placeholder.svg?height=96&width=96&text=AirPods",
    },
  ];

  if (parseInt(id) % 2 === 0) {
    items.push({
      id: "accessory-3",
      name: "iPhone 15 Pro Case",
      price: 49.99,
      quantity: 1,
      variant: "Clear",
      image: "/placeholder.svg?height=96&width=96&text=Case",
    });
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 9.99;
  const tax = subtotal * 0.07;
  const discount = parseInt(id) % 3 === 0 ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const timeline = [
    {
      title: "Order Placed",
      description: "Your order has been received and is being processed.",
      date: new Date(
        orderDate.getTime() - 3 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      icon: "package",
      completed: isProcessing || isShipped || isDelivered,
    },
    {
      title: "Processing",
      description: "Your order is being prepared for shipping.",
      date: new Date(
        orderDate.getTime() - 2 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      icon: "clock",
      completed: isProcessing || isShipped || isDelivered,
    },
    {
      title: "Shipped",
      description: "Your order has been shipped and is on its way.",
      date: new Date(
        orderDate.getTime() - 1 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      icon: "truck",
      completed: isShipped || isDelivered,
    },
    {
      title: "Delivered",
      description: "Your order has been delivered.",
      date: orderDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      icon: "check",
      completed: isDelivered,
    },
  ];

  return {
    id,
    date: orderDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    status,
    items,
    subtotal,
    shipping,
    tax,
    discount,
    total,
    paymentMethod: parseInt(id) % 2 === 0 ? "Visa Card" : "PayPal",
    paymentLast4: "4242",
    trackingNumber:
      isShipped || isDelivered
        ? "TRK" + Math.floor(Math.random() * 1000000000).toString()
        : null,
    timeline,
    shipping: {
      name: "John Doe",
      address1: "123 Main Street",
      address2: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States",
      phone: "(123) 456-7890",
    },
    billingAddress: {
      name: "John Doe",
      address1: "123 Main Street",
      address2: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States",
    },
  };
}

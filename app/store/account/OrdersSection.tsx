import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetOrderHistory } from "@/hooks/query";
import { Order } from "@/types";
import { naira } from "@/utils/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrdersSection = ({ activeTab }: { activeTab: string }) => {
  const { data } = useGetOrderHistory();
  console.log("data", data);
  return (
    <>
      {activeTab === "orders" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and manage your orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.orders?.map((order: Order, i: number) => (
                  <div key={i} className="rounded-lg border">
                    <div className="flex flex-wrap items-center justify-between gap-4 p-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            Order #{123456 + i}
                          </span>
                          <Badge
                            variant={
                              i === 0
                                ? "default"
                                : i === 1
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Placed on {order.createdAt}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {naira(order.totalAmount)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {3 - i} items
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="p-4">
                      <div className="flex flex-wrap gap-4">
                        {order?.products?.map((product, j) => (
                          <div
                            key={j}
                            className="relative h-16 w-16 overflow-hidden rounded-md border"
                          >
                            <Image
                              src={`/placeholder.svg?height=64&width=64&text=Item${
                                j + 1
                              }`}
                              alt={`Item ${j + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between p-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/order/${123456 + i}`}>View Details</Link>
                      </Button>
                      {i === 0 && <Button size="sm">Buy Again</Button>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">View All Orders</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default OrdersSection;

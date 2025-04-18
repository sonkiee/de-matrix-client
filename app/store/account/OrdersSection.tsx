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
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrdersSection = ({ activeTab }) => {
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
                {[...Array(3)].map((_, i) => (
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
                            {i === 0
                              ? "Delivered"
                              : i === 1
                              ? "Shipped"
                              : "Processing"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Placed on{" "}
                          {i === 0
                            ? "May 15, 2023"
                            : i === 1
                            ? "June 2, 2023"
                            : "June 10, 2023"}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          ${(99.99 + i * 50).toFixed(2)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {3 - i} items
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="p-4">
                      <div className="flex flex-wrap gap-4">
                        {[...Array(3 - i)].map((_, j) => (
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

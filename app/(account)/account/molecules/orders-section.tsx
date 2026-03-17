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
import { useFetchUserOrders } from "@/queries";
import { Order } from "@/types";
import { naira } from "@/utils/naira";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import OrderItem from "../orders/molecules/order-item";

const OrdersSection = ({ activeTab }: { activeTab: string }) => {
  const router = useRouter();
  const { data, isLoading } = useFetchUserOrders();
  const orders = data?.data as Order[] | undefined;

  console.log("Orders fetched", orders?.length);
  const is = orders;
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
              {!orders && <NoOrders />}

              {orders?.length && (
                <OrderItem
                  status="Delivered"
                  date="Oct 24, 2023"
                  orderNumber="Order #LX-84920"
                  title="Nike Air Max Premium - Crimson Red"
                  total="$249.00"
                  itemCount={1}
                  imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuB4QyvYR5AhDWx7jmR59aJuj2XUidY3U1EYJQfVFD7Pk8rCdpNujC9sS4j0BZALjQrEWUgcgHXtp7yOvaP18_dj9lhQxmU3V1EUT6u2wZ_bP1-pA9c7SD35oWv9f8_S_6isJLrun0WDwxexM1CoOkeqIBn4muKwRVN3-6RKXZzK5mzEevj_R9uIUWSu9G-iP_akw1KnJ94eHrqVzYGH3I-TyboZsY2YywP_WyqSmSXW08UyqCyQmKTel_HgRUdqV9fkYikCK6lOKw"
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              {is && (
                <Button
                  onClick={() => router.push("/account/orders")}
                  variant="outline"
                >
                  View All Orders
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default OrdersSection;

const NoOrders = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <h2 className="text-lg font-semibold">No Orders Yet</h2>
      <p className="text-sm  text-muted-foreground text-center">
        Looks like you haven&apos;t made any orders yet. Start shopping to see
        your orders here!
      </p>
      <Link href="/" className="mt-4">
        <Button variant="outline">Start Shopping</Button>
      </Link>
    </div>
  );
};

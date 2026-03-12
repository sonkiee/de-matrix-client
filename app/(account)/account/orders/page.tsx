// app/store/account/orders/page.tsx
"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

type Money = { amount: number; currency: "NGN" };

type OrderListItem = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  itemsCount: number;
  total: Money;
};

const DUMMY_ORDERS: OrderListItem[] = [
  {
    id: "50ae9f15-2a40-4195-9597-8b25a24feb98",
    createdAt: "2026-03-03T10:00:00.000Z",
    status: "Processing",
    itemsCount: 3,
    total: { amount: 40997, currency: "NGN" },
  },
  {
    id: "9d2a9f55-0c0e-4fa0-9b6c-7b28f9b62c1a",
    createdAt: "2026-02-26T15:20:00.000Z",
    status: "Shipped",
    itemsCount: 1,
    total: { amount: 12000, currency: "NGN" },
  },
  {
    id: "b5f0c1c0-2e0a-4b2f-a0d2-2f1e6a7f2b9d",
    createdAt: "2026-02-10T09:05:00.000Z",
    status: "Delivered",
    itemsCount: 5,
    total: { amount: 98500, currency: "NGN" },
  },
];

export default function OrdersPage() {
  return (
    <main className="bg-[#F5F5F7] min-h-screen">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Orders
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your recent purchases.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/store">Continue shopping</Link>
          </Button>
        </div>

        {/* List */}
        <Card className="rounded-2xl">
          <CardContent className="p-0">
            <div className="divide-y">
              {DUMMY_ORDERS.map((o) => {
                const ui = statusUI(o.status);

                return (
                  <Link
                    key={o.id}
                    href={`/account/orders/${o.id}`}
                    className="block p-4 sm:p-5 hover:bg-black/5 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 space-y-1">
                        <p className="text-sm font-semibold text-gray-900">
                          Order #{o.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(o.createdAt)} • {o.itemsCount} item(s)
                        </p>
                      </div>

                      <div className="shrink-0 text-right space-y-2">
                        <Badge variant="outline" className={ui.badgeClass}>
                          {ui.label}
                        </Badge>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatMoney(o.total.amount, o.total.currency)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Empty state (optional) */}
        {DUMMY_ORDERS.length === 0 && (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">No orders yet.</p>
              <Button asChild>
                <Link href="/store">Start shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function statusUI(status: OrderStatus) {
  if (status === "Delivered") {
    return {
      label: "Delivered",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  }
  if (status === "Shipped") {
    return {
      label: "Shipped",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    };
  }
  if (status === "Processing") {
    return {
      label: "Processing",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    };
  }
  return {
    label: status,
    badgeClass: "bg-red-50 text-red-700 border-red-200",
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatMoney(amount: number, currency: "NGN") {
  if (currency === "NGN") return `₦${amount.toLocaleString("en-NG")}`;
  return amount.toLocaleString("en-US");
}

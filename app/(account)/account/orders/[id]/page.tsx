"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import type { OrderProduct } from "@/types";

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

type Money = { amount: number; currency: "NGN" };

type OrderDetails = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  total: Money;
  itemsCount: number;
  shippingCity?: string;
  shippingState?: string;
  paymentMethod?: string;
  products: OrderProduct[];
};

const DUMMY_ORDER: OrderDetails = {
  id: "50ae9f15-2a40-4195-9597-8b25a24feb98",
  createdAt: "2026-03-03T10:00:00.000Z",
  status: "Processing",
  total: { amount: 40997, currency: "NGN" },
  itemsCount: 3,
  shippingCity: "Abuja",
  shippingState: "FCT",
  paymentMethod: "Card",
  products: [
    {
      product: "prod_1",
      quantity: 1,
      price: 24999,
      variant: { id: "var_1", name: "iPhone 13 • 128GB • Midnight" } as any,
    },
    {
      product: "prod_2",
      quantity: 2,
      price: 7999,
      variant: { id: "var_2", name: "USB-C Fast Charger • 20W" } as any,
    },
  ],
};

export default function OrderDetailsPreview() {
  const order = DUMMY_ORDER;

  const ui = statusUI(order.status);
  const canCancel = order.status === "Processing";
  const canReorder = order.status === "Delivered";

  const placedOn = formatDate(order.createdAt);

  return (
    <main className="bg-[#F5F5F7] min-h-screen">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 space-y-6">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/account?tab=orders" aria-label="Back to orders">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Order #{order.id.slice(0, 8)}
              </h1>
              <p className="text-sm text-muted-foreground">
                Placed on {placedOn}
              </p>
            </div>
          </div>

          <Badge variant="outline" className={ui.badgeClass}>
            {ui.label}
          </Badge>
        </div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Items */}
          <Card className="lg:col-span-2 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Items</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-5">
                {order.products.map((item, index) => (
                  <PreviewItemRow key={index} item={item} />
                ))}
              </div>

              {(canCancel || canReorder) && (
                <>
                  <Separator />
                  <div className="flex flex-col sm:flex-row gap-3">
                    {canReorder && (
                      <Button className="sm:w-auto">Reorder</Button>
                    )}
                    {canCancel && (
                      <Button variant="outline" className="sm:w-auto">
                        Cancel order
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="rounded-2xl h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <Row label="Order ID" value={order.id} mono />
              <Row label="Date" value={placedOn} />
              <Row label="Items" value={`${order.itemsCount} item(s)`} />
              <Row
                label="Total"
                value={formatMoney(order.total.amount, order.total.currency)}
              />
              {(order.shippingCity || order.shippingState) && (
                <Row
                  label="Ship to"
                  value={[order.shippingCity, order.shippingState]
                    .filter(Boolean)
                    .join(", ")}
                />
              )}
              {order.paymentMethod && (
                <Row label="Payment" value={order.paymentMethod} />
              )}
              <Separator />
              <Button asChild variant="outline" className="w-full">
                <Link href="/support">Contact support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

/* -------------------- Order List Page (Preview) -------------------- */

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

export function OrdersListPreview() {
  return (
    <main className="bg-[#F5F5F7] min-h-screen">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 space-y-6">
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

        <Card className="rounded-2xl">
          <CardContent className="p-0">
            <div className="divide-y">
              {DUMMY_ORDERS.map((o) => {
                const ui = statusUI(o.status);

                return (
                  <Link
                    key={o.id}
                    href={`/store/order/${o.id}`}
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
      </div>
    </main>
  );
}

/* -------------------- Small helpers -------------------- */

function PreviewItemRow({ item }: { item: OrderProduct }) {
  const name = (item.variant as any)?.name ?? "Item";
  const qty = item.quantity ?? 1;
  const price = Number(item.price ?? 0);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-xs text-muted-foreground">Qty {qty}</p>
      </div>

      <p className="text-sm font-semibold whitespace-nowrap">
        ₦{price.toLocaleString("en-NG")}
      </p>
    </div>
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

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 min-w-0">
      <span className="text-muted-foreground whitespace-nowrap">{label}</span>
      <span
        className={[
          "text-right min-w-0",
          mono ? "font-mono break-all" : "",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
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

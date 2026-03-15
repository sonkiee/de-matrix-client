"use client";

import { Ellipsis, EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../molecules/table";
import { useFetchOrders } from "@/queries/admin";
import { naira } from "@/utils/naira";

export default function OrdersTable() {
  const { data, isLoading, error } = useFetchOrders();

  const orders = data?.data;

  console.log("returning", orders);
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>order id</TableHeaderCell>
            <TableHeaderCell>customer</TableHeaderCell>
            <TableHeaderCell>date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>total</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* <TableRow> */}
          {orders?.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell className="px-6 py-4 font-medium text-gray-900">
                {order.id}
              </TableCell>
              <TableCell>{order.user?.firstName}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  {order.status}
                </span>
              </TableCell>
              <TableCell>{naira(order.total)}</TableCell>
            </TableRow>
          ))}
          {/* </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
}

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
import { useListPayments } from "@/queries/admin";
import { date } from "@/utils/date";

export default function PaymentsTable() {
  const { data, isLoading, error } = useListPayments();

  const payments = data?.data || [];

  console.log("returning paymets", payments);
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>transaction id</TableHeaderCell>
            <TableHeaderCell>customer</TableHeaderCell>
            <TableHeaderCell>date</TableHeaderCell>
            <TableHeaderCell>amount</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payments.map((payment: any) => (
            <TableRow key={payment.id}>
              <TableCell className="px-6 py-4 font-medium text-gray-900">
                {payment.id}
              </TableCell>
              <TableCell>{payment.user?.firstName}</TableCell>
              <TableCell>{date(payment.createdAt)}</TableCell>
              <TableCell className="text-xs">{payment.amount}</TableCell>
              <TableCell>
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  {payment.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

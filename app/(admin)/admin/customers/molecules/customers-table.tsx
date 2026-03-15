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
import { useListUsers } from "@/queries/admin";
import Person from "./person";

export default function CustomersTable() {
  const { data, isLoading, error } = useListUsers();

  const users = data?.data ?? [];

  console.log("returning", users);
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>customer</TableHeaderCell>
            <TableHeaderCell>email address</TableHeaderCell>
            <TableHeaderCell>total orders</TableHeaderCell>
            <TableHeaderCell>total spent</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell className="px-6 py-4 font-medium text-gray-900">
                <Person
                  fname={user.firstName}
                  lname={user.lastName}
                  email={user.email}
                />
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>10</TableCell>
              <TableCell>$100.00</TableCell>
              <TableCell>
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Active
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

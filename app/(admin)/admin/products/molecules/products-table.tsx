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
import Status from "../../molecules/status";
import StatusBadge from "../../molecules/status";
import { useListProducts } from "@/queries/admin";
import Prdt from "./prdt";
import { naira } from "@/utils/naira";

export default function ProductsTable() {
  const { data, isLoading, error } = useListProducts();

  const products = data?.data ?? [];

  console.log("returning", products);
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Stock</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell className="px-6 py-4 font-medium text-gray-900">
                <Prdt name={product.title} category={product.category?.name} />
              </TableCell>
              <TableCell>{product.category?.name}</TableCell>
              <TableCell>{naira(product.price ?? 0)}</TableCell>
              <TableCell>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </TableCell>
              <TableCell>
                {/* <StatusBadge status={product.isActive} /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

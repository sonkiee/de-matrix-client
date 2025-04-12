import Link from "next/link";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export function ProductCard({ index, category = "" }) {
  const products = {
    smartphone: [
      { name: "iPhone 15 Pro", price: 999.99 },
      { name: "Samsung Galaxy S23", price: 899.99 },
      { name: "Google Pixel 8", price: 799.99 },
      { name: "OnePlus 11", price: 699.99 },
      { name: "Xiaomi 13", price: 649.99 },
    ],
    laptop: [
      { name: 'MacBook Pro 14"', price: 1999.99 },
      { name: "Dell XPS 15", price: 1799.99 },
      { name: "HP Spectre x360", price: 1499.99 },
      { name: "Lenovo ThinkPad X1", price: 1699.99 },
      { name: "ASUS ROG Zephyrus", price: 1899.99 },
    ],
    accessory: [
      { name: "AirPods Pro", price: 249.99 },
      { name: "Samsung Galaxy Watch", price: 299.99 },
      { name: "Anker Power Bank", price: 49.99 },
      { name: "Logitech MX Master", price: 99.99 },
      { name: "Belkin Wireless Charger", price: 39.99 },
    ],
  };

  const defaultProducts = [
    { name: "iPhone 15 Pro", price: 999.99 },
    { name: 'MacBook Pro 14"', price: 1999.99 },
    { name: "Samsung Galaxy S23", price: 899.99 },
    { name: "AirPods Pro", price: 249.99 },
    { name: "Dell XPS 15", price: 1799.99 },
    { name: "Google Pixel 8", price: 799.99 },
    { name: "Samsung Galaxy Watch", price: 299.99 },
    { name: "HP Spectre x360", price: 1499.99 },
    { name: "Anker Power Bank", price: 49.99 },
    { name: "OnePlus 11", price: 699.99 },
  ];

  const product = category
    ? products[category][index % products[category].length]
    : defaultProducts[index % defaultProducts.length];

  const isNew = index % 5 === 0;
  const isLowStock = index % 7 === 0;

  return (
    <Link href={`/product/${index}`} className="group">
      <div className="relative overflow-hidden rounded-lg border bg-background">
        <div className="relative aspect-square overflow-hidden">
          {isNew && <Badge className="absolute left-2 top-2 z-10">New</Badge>}
          {isLowStock && (
            <Badge
              variant="outline"
              className="absolute left-2 top-2 z-10 bg-yellow-100 text-yellow-800"
            >
              Low Stock
            </Badge>
          )}
          <Image
            src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(
              product.name
            )}`}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
          >
            Quick View
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {category ||
              (index % 3 === 0
                ? "Smartphone"
                : index % 3 === 1
                ? "Laptop"
                : "Accessory")}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

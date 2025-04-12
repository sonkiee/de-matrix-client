import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">TechGadgets</span>
          </Link>
        </div>
        <div className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/account">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
      <nav className="container hidden pb-3 md:block">
        <ul className="flex gap-6">
          <li>
            <Link
              href="/category/smartphones"
              className="text-sm font-medium hover:text-primary"
            >
              Smartphones
            </Link>
          </li>
          <li>
            <Link
              href="/category/laptops"
              className="text-sm font-medium hover:text-primary"
            >
              Laptops
            </Link>
          </li>
          <li>
            <Link
              href="/category/tablets"
              className="text-sm font-medium hover:text-primary"
            >
              Tablets
            </Link>
          </li>
          <li>
            <Link
              href="/category/accessories"
              className="text-sm font-medium hover:text-primary"
            >
              Accessories
            </Link>
          </li>
          <li>
            <Link
              href="/category/parts"
              className="text-sm font-medium hover:text-primary"
            >
              Parts
            </Link>
          </li>
          <li>
            <Link
              href="/deals"
              className="text-sm font-medium text-rose-500 hover:text-rose-600"
            >
              Deals
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import {
  Package,
  ShoppingCart,
  CreditCard,
  Group,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/admin/products", label: "Products", icon: <Package size={18} /> },
  { href: "/admin/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
  {
    href: "/admin/payments",
    label: "Payments",
    icon: <CreditCard size={18} />,
  },
  { href: "/admin/customers", label: "Customers", icon: <Users size={18} /> },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";

    return pathname.startsWith(path);
  };
  console.log("Current pathname:", pathname);

  return (
    <aside className="w-64 border-r bg-background p-4">
      <div className="text-xl font-semibold mb-6">Admin</div>

      <nav className="space-y-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`flex items-center gap-2 p-2 rounded ${isActive(link.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

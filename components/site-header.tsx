"use client";

import { Menu, X, Search, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { MobileNavLink } from "./mobile-nav-link";
import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";

type SiteHeaderProps = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

export function SiteHeader({ darkMode, setDarkMode }: SiteHeaderProps) {
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const navLinks = [
    { label: "Store", href: "/shop" },
    { label: "iPhones", href: "/shop/iphones" },
    { label: "Samsung", href: "/shop/samsung" },
    { label: "iPads", href: "/shop/ipads" },
    { label: "Repairs", href: "/services/repairs" },
    { label: "Accessories", href: "/shop/accessories" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-gray-900/70">
      <div className="px-6 md:px-10 py-4 flex items-center justify-between max-w-6xl mx-auto">
        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-semibold text-gray-900 dark:text-white"
        >
          <span className="text-blue-600 dark:text-blue-400">Dematrix</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            className="h-9 w-9 rounded-full grid place-items-center hover:bg-gray-100 dark:hover:bg-white/10 transition"
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-gray-700 dark:text-gray-200" />
          </button>

          {/* Cart */}
          <button
            className="h-9 w-9 rounded-full grid place-items-center hover:bg-gray-100 dark:hover:bg-white/10 transition"
            aria-label="Cart"
          >
            <FaShoppingBag className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </button>

          {/* Dark mode toggle (optional, since you passed props) */}
          {/* If you want it visible, uncomment: */}
          {/* 
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="h-9 w-9 rounded-full grid place-items-center hover:bg-gray-100 dark:hover:bg-white/10 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-gray-700 dark:text-gray-200" />
            ) : (
              <Moon className="h-4 w-4 text-gray-700 dark:text-gray-200" />
            )}
          </button>
          */}

          {/* Mobile menu */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="rounded-full"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobile && isMenuOpen && (
        <div className="border-t bg-white dark:bg-gray-900">
          <nav className="px-6 py-5 space-y-1 max-w-6xl mx-auto">
            {navLinks.map((l) => (
              <MobileNavLink key={l.label} href={l.href} onClick={toggleMenu}>
                {l.label}
              </MobileNavLink>
            ))}

            <div className="pt-3">
              <MobileNavLink href="/contact" onClick={toggleMenu}>
                Contact
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={toggleMenu}>
                About Us
              </MobileNavLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

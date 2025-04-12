"use client";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { MobileNavLink } from "./MobileNavLink";

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

// Header Component
export function Header({ darkMode, setDarkMode }: HeaderProps) {
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="sticky top-0 bg-white dark:bg-gray-800 shadow z-50 ">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Dematrix Technologies
        </div>
        <nav className="hidden md:flex gap-4">
          {[
            "Home",
            "Shop",
            "Swap",
            "Repair",
            "Book a Repair",
            "Contact",
            "About Us",
          ].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-blue-500 dark:hover:text-blue-300"
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="flex gap-3 items-center">
          {/* <input
            type="text"
            placeholder="Search..."
            className="border px-2 py-1 rounded dark:bg-gray-700 dark:border-gray-600"
          /> */}
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun /> : <Moon />}
          </Button>
          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button variant="ghost" size="lg" onClick={toggleMenu}>
              {isMenuOpen ? <X size={50} /> : <Menu size={30} />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {/* <div className="container mx-auto px-4"></div> */}
      {isMobile && isMenuOpen && (
        <nav className="bg-white border-t">
          <div className=" mx-auto py-4 px-4 space-y-4">
            <MobileNavLink href="/" onClick={toggleMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/shop" onClick={toggleMenu}>
              Shop
            </MobileNavLink>
            <MobileNavLink href="/swap" onClick={toggleMenu}>
              Swap
            </MobileNavLink>
            <MobileNavLink href="/repair" onClick={toggleMenu}>
              Repair
            </MobileNavLink>
            <MobileNavLink href="/book" onClick={toggleMenu}>
              Book a Repair
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={toggleMenu}>
              Contact
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={toggleMenu}>
              About Us
            </MobileNavLink>
          </div>
        </nav>
      )}
    </header>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Search, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoreHeroSection } from "@/components/store/Hero";
import { StoreCategories } from "@/components/store/CategorySection";
import { StoreProducts } from "@/components/store/Products";
import { DealsSection } from "@/components/store/Deals";
import { Newsletter } from "@/components/store/NewsLetter";

export default function Store() {
  return (
    <div className="flex min-h-screen flex-col px-6">
      {/* Mobile Search - visible only on small screens */}
      <div className="container py-4 md:hidden">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for products..."
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Banner */}
        <StoreHeroSection />

        {/* Categories */}
        <StoreCategories />

        {/* Featured Products */}
        <StoreProducts />

        {/* Deals Section */}
        <DealsSection />

        {/* Newsletter */}
        <Newsletter />
      </main>
    </div>
  );
}

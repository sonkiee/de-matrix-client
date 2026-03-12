"use client";

import { useState } from "react";
import { WhyChooseUsSection } from "@/components/why-choose-us";
import { HeroSection } from "../components/hero-section";
// import { BookRepair } from "@/components/BookRepair";
import { SiteHeader } from "@/components/site-header";
import ShopByCategory from "@/components/category-showcase";
import SiteFooter from "../components/site-footer";
import CategoryShowcase from "@/components/category-showcase";
import { HotDeals } from "@/components/hot-deals";
import { StoreServices } from "@/components/store-services";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-[calc(100vh-80px)]
        flex flex-col"
      >
        {/* Header */}
        <SiteHeader />
        <HeroSection />
        {/* Services */}
        <StoreServices />
        <CategoryShowcase />
        {/* Best Sellers  */}
        <HotDeals />
        {/* Brands */}
        {/* Why Choose Us */}
        <WhyChooseUsSection />
        {/* Book Repair */}
        {/* <BookRepair /> */}
        {/* Testimonials */}
        <section className="py-16 bg-gray-50 text-center">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Happy Customers", value: "5,000+" },
              { label: "Devices Repaired", value: "8,200+" },
              { label: "Average Rating", value: "4.8★" },
              { label: "Years Experience", value: "6+" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

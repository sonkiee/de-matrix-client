"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Featured } from "@/components/Featured";
import { Services } from "@/components/Services";
import { HeroSection } from "../components/HeroSection";
import { BookRepair } from "@/components/BookRepair";
import { BestSellers } from "@/components/BestSellers";
import { Header } from "@/components/Header";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Header */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Hero */}
        <HeroSection />

        {/* Services */}
        <Services />

        {/* Brands */}
        <Featured />

        {/* Best Sellers  */}

        <BestSellers />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Book Repair */}
        <BookRepair />

        {/* Testimonials */}
        <section className="py-10 px-6 bg-white dark:bg-gray-900 text-center">
          <h2 className="text-2xl font-bold mb-4">What our customers say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <blockquote className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow italic">
              &quot;Excellent service! Fixed my phone quickly.&quot; – Ada
            </blockquote>
            <blockquote className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow italic">
              &quot;Swapping was a breeze, recommended!&quot; – Tunde
            </blockquote>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

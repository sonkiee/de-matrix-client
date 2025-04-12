"use client";

import { useState } from "react";
import { Sun, Moon, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 bg-white dark:bg-gray-800 shadow z-50 px-6 py-4 flex items-center justify-between">
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
            <input
              type="text"
              placeholder="Search..."
              className="border px-2 py-1 rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun /> : <Moon />}
            </button>
            <a
              href="https://wa.me/234XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="text-green-500" />
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="text-center py-20 bg-gray-100 dark:bg-gray-800">
          <motion.img
            src="/assets/hero-gadgets.jpg"
            alt="Gadgets"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-4xl rounded-xl shadow-xl"
          />
          <h1 className="text-4xl md:text-5xl font-bold mt-6">
            Buy, Swap, Repair – Fast & Reliable!
          </h1>
          <div className="mt-6 space-x-4">
            {["Shop Now", "Book a Repair", "Swap Your Device"].map(
              (label, i) => (
                <button
                  key={i}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl shadow"
                >
                  {label}
                </button>
              )
            )}
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="grid md:grid-cols-3 gap-6 p-10 bg-white dark:bg-gray-900"
        >
          {[
            {
              icon: "/icons/sales.svg",
              title: "Sales",
              desc: "Latest smartphones & accessories.",
            },
            {
              icon: "/icons/swap.svg",
              title: "Swap",
              desc: "Instant device exchange made easy.",
            },
            {
              icon: "/icons/repair.svg",
              title: "Repair",
              desc: "Fast, expert, and reliable repairs.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-center">
              <Image
                src={icon}
                alt={title}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </section>

        {/* Brands */}
        <section className="text-center py-10 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-6">Featured Brands</h2>
          <div className="flex justify-center gap-10">
            <Image src="/brands/apple.svg" alt="Apple" className="w-20" />
            <Image src="/brands/samsung.svg" alt="Samsung" className="w-20" />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-10 px-6 bg-white dark:bg-gray-900 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              "Fast Service",
              "Genuine Parts",
              "Expert Repairs",
              "Warranty Coverage",
            ].map((reason) => (
              <div
                key={reason}
                className="bg-blue-50 dark:bg-gray-800 p-4 rounded shadow"
              >
                {reason}
              </div>
            ))}
          </div>
        </section>

        {/* Book Repair */}
        <section
          id="book-a-repair"
          className="py-10 px-6 bg-gray-100 dark:bg-gray-800"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Book a Repair Online
          </h2>
          <form className="max-w-xl mx-auto space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
            <input
              placeholder="Name"
              className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600"
            />
            <input
              placeholder="Phone"
              className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600"
            />
            <textarea
              placeholder="Issue Description"
              className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600"
            />
            <input
              type="datetime-local"
              className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded shadow"
            >
              Book Now
            </button>
          </form>
        </section>

        {/* Testimonials */}
        <section className="py-10 px-6 bg-white dark:bg-gray-900 text-center">
          <h2 className="text-2xl font-bold mb-4">Customer Testimonials</h2>
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
        <footer className="bg-gray-900 text-gray-200 px-6 py-10 grid md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold mb-2">Contact</h4>
            <p>Email, Phone, Address</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Social</h4>
            <p>Instagram | Twitter | WhatsApp</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Support</h4>
            <p>FAQs | Warranty | Return Policy</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Payment</h4>
            <p>Paystack, Transfer, Cash</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

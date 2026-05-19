import { SiteHeader } from "@/components/site-header";
import { StoreHeader } from "@/components/store-header";
import React from "react";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      <StoreHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="border-t p-6">Footer</footer>
    </div>
  );
}

import { SiteHeader } from "@/components/site-header";
import React from "react";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F5F5F7] min-h-screen">
      <SiteHeader />
      {/* Offset for fixed header height */}
      {children}
      <footer>Footer</footer>
    </div>
  );
}

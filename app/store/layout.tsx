import { StoreHeader } from "@/components/store/Header";
import React from "react";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f1f1f2]">
      {/* Header */}
      <StoreHeader />

      {children}
      <footer>Footer</footer>
    </div>
  );
}

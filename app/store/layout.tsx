import { StoreHeader } from "@/components/store/Header";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-[#F5F5F7]">
      {/* Header */}
      <StoreHeader />
      {children}
      <footer>Footer</footer>
      <Toaster />
    </div>
  );
}

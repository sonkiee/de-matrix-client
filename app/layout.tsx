import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
// import { CartIcon } from "@/components/cart-icon";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechGadgets - Your One-Stop Gadget Shop",
  description: "Shop the latest smartphones, laptops, and tech accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Suspense
            fallback={
              <div className="fixed top-4 right-4">{/* <CartIcon /> */}</div>
            }
          >
            {children}
            {/* <CartIcon /> */}
          </Suspense>
        </ReactQueryProvider>

        <Analytics />
        <Toaster position="top-center" duration={3000} />
        {/* <AuthGateListener /> */}
      </body>
    </html>
  );
}

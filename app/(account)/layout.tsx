import { SiteHeader } from "@/components/site-header";
import { StoreHeader } from "@/components/store-header";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F5F5F7] min-h-screen">
      <StoreHeader />

      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      {/* {children} */}
    </div>
  );
}

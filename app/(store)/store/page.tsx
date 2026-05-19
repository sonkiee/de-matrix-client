"use client";
// import { useState } from "react";

export default function StorePage() {
  // const [menuOpen, setMenuOpen] = useState(false);

  // const categories = [
  //   "Smartphones",
  //   "iPhone",
  //   "Samsung",
  //   "Accessories",
  //   "Repairs",
  // ];
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      {/* HEADER */}

      {/* 
      {menuOpen && (
        <div className="fixed inset-0 z-[100]">
    
          <div
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

      
          <div className="absolute left-0 top-0 h-full w-80 bg-surface shadow-xl flex flex-col">
            <div className="h-16 flex items-center justify-between px-4 border-b border-surface-variant">
              <span className="font-bold">ELECTRA</span>

              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full hover:bg-surface-variant"
              >
                ✕
              </button>
            </div>

            <nav className="p-4 flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="text-left px-3 py-2 rounded-lg hover:bg-surface-variant"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )} */}

      <main className="max-w-6xl mx-auto w-full px-4 py-10 space-y-12">
        {/* CATEGORY GRID (OPTIONAL BUT CLEAN) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Smartphones", "iPhone", "Samsung", "Accessories", "Repairs"].map(
            (cat) => (
              <div
                key={cat}
                className="p-4 rounded-xl border bg-surface-container-low hover:shadow-sm transition"
              >
                <div className="h-24 bg-surface-container rounded-lg mb-3" />
                <p className="font-medium text-sm">{cat}</p>
              </div>
            ),
          )}
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Featured</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 bg-surface-container-low hover:shadow-sm transition flex flex-col"
              >
                <div className="h-40 bg-surface-container rounded-lg mb-3" />

                <p className="text-xs text-on-surface-variant">Smartphone</p>
                <h3 className="font-medium">Product Name</h3>
                <p className="text-sm text-on-surface-variant flex-1">
                  Short product description goes here.
                </p>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-semibold">$999</span>
                  <button className="text-sm px-3 py-1 rounded bg-primary text-white">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">New Arrivals</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-6 rounded-xl bg-surface-container-low border">
              <p className="text-xs text-primary mb-2">JUST LAUNCHED</p>
              <h3 className="text-2xl font-semibold mb-2">Studio Display</h3>
              <p className="text-sm text-on-surface-variant mb-4">
                Premium display for creators and professionals.
              </p>
              <button className="px-4 py-2 rounded bg-primary text-white">
                Discover
              </button>
            </div>

            <div className="p-4 rounded-xl border bg-surface-container-low">
              <div className="h-24 bg-surface-container rounded mb-3" />
              <p className="font-medium">Smart Hub</p>
              <p className="text-sm text-on-surface-variant">$99</p>
            </div>

            <div className="p-4 rounded-xl border bg-surface-container-low">
              <div className="h-24 bg-surface-container rounded mb-3" />
              <p className="font-medium">Earbuds</p>
              <p className="text-sm text-on-surface-variant">$129</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-surface-container-low mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-on-surface-variant">
          © {new Date().getFullYear()} Electra. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Featured Brands & Products Section
export function Featured() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Brands & Products
        </h2>

        {/* Brands */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {["Apple", "Samsung", "Google", "Xiaomi", "Huawei"].map((brand) => (
            <div
              key={brand}
              className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center w-32 h-32"
            >
              <p className="font-semibold text-lg">{brand}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

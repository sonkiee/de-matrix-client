import Image from "next/image";

export default function AdminProductDetailsPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <a className="text-sm text-gray-500 hover:text-gray-700"></a>

        <div className="flex gap-3">
          {/* <button className="px-4 py-2 text-sm border rounded-md">
            Duplicate
          </button> */}
          <button className="px-4 py-2 text-sm border border-red-300 text-red-700 rounded-md">
            Archive
          </button>
          <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md">
            Edit Product
          </button>
        </div>
      </div>

      {/* Product Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Image */}
        <div className="lg:col-span-5 bg-white border rounded-xl p-4">
          <Image
            width={100}
            height={100}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE0mm7aRVqGguA5PndWv8phKD4U7NjhGbkuIHX8DiIOR8h4gybDYhjJAcl0FJ9fbH0GbbiH5DaaWcOKtGy63BD7VJpQWkRwrhfBguw5cIYfU3_VJ4EVWEHVzGrG0nCc1grhsTXud-bC0qu0AbQekhcmgtPrW9O4eBegYK3m0Qj_rPgeY1CZG7NJ_Fux14jXlPMzBfPxugxgjGIJQKDHrFhuQhUfLcBazBMSLoXr2uEgZB0mm4gh1-2_RgMArqDwxtLar_sCoBXcBnS"
            alt="Product"
            className="w-full rounded-lg aspect-square object-cover"
          />
        </div>

        {/* Details */}
        <div className="lg:col-span-7 bg-white border rounded-xl p-8 space-y-6">
          <div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              Active
            </span>

            <h1 className="text-3xl font-bold mt-2">
              Premium Wireless Noise-Cancelling Headphones
            </h1>

            <p className="text-sm text-gray-500 uppercase mt-1">
              SKU: WH-1000XM5-BLK
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Current Price</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">$349.99</p>
              <p className="text-xs text-gray-400">MSRP: $399.99</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Stock Level</p>
              <p className="text-2xl font-bold mt-1">1,240</p>
              <p className="text-xs text-green-600">In Stock</p>
              <p className="text-xs text-gray-400">Across 3 warehouses</p>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold border-b pb-2">
              Category & Classification
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm font-medium">Electronics &gt; Audio</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Brand</p>
                <p className="text-sm font-medium">SoundMaster Pro</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

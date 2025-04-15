import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function StoreCategories() {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Shop by Category
          </h2>
          <Link
            href="/store/categories"
            className="flex items-center text-sm font-medium text-primary"
          >
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          <Link
            href="/store/category/smartphones"
            className="group relative overflow-hidden rounded-lg"
          >
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Smartphones"
              width={200}
              height={200}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 w-full p-4">
              <h3 className="text-lg font-semibold text-white">Smartphones</h3>
            </div>
          </Link>
          <Link
            href="/store/category/laptops"
            className="group relative overflow-hidden rounded-lg"
          >
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Laptops"
              width={200}
              height={200}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 w-full p-4">
              <h3 className="text-lg font-semibold text-white">Laptops</h3>
            </div>
          </Link>
          <Link
            href="/store/category/tablets"
            className="group relative overflow-hidden rounded-lg"
          >
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Tablets"
              width={200}
              height={200}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 w-full p-4">
              <h3 className="text-lg font-semibold text-white">Tablets</h3>
            </div>
          </Link>
          <Link
            href="/store/category/accessories"
            className="group relative overflow-hidden rounded-lg"
          >
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Accessories"
              width={200}
              height={200}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 w-full p-4">
              <h3 className="text-lg font-semibold text-white">Accessories</h3>
            </div>
          </Link>
          <Link
            href="/store/category/parts"
            className="group relative overflow-hidden rounded-lg"
          >
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Parts"
              width={200}
              height={200}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 w-full p-4">
              <h3 className="text-lg font-semibold text-white">Parts</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import hero from "../assets/images/hero.png";

export function HeroSection() {
  return (
    <section className="w-full px-6 md:px-10 py-20 text-center">
      <p className="text-xs uppercase tracking-widest text-gray-500">
        New arrival
      </p>

      <h1 className="mt-3 text-4xl md:text-6xl font-semibold text-gray-900">
        iPhone 15 Pro
      </h1>

      <p className="mt-4 text-lg md:text-xl text-gray-600 mb-8">
        Titanium. So strong. So light. So Pro.
      </p>

      <div className="flex flex-row gap-4 items-center justify-center">
        <Button
          variant="outline"
          className="rounded-full shadow-none border-gray-300"
        >
          Buy Now
        </Button>

        <Button variant="ghost" className="rounded-full">
          Learn more <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Hero Image Box */}
      <div className="relative mx-auto mt-12 w-full max-w-4xl overflow-hidden rounded-3xl ring-1 ring-black/5 bg-gradient-to-b from-gray-100 to-gray-200">
        {/* subtle glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />

        <div className="relative flex items-center justify-center px-6 py-10">
          <Image
            src={hero}
            alt="Gadgets"
            width={900}
            height={600}
            priority
            className="w-full max-w-3xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}

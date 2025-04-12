import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

// Hero Section Component
export function HeroSection() {
  return (
    <section className="relative h-[500px] w-full">
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Hero image of mobile phones and gadgets"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative text-center items-center z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-3xl text-center md:text-5xl font-bold text-white mb-4">
          Buy, Swap, Repair –{" "}
          <span className="text-blue-400">Fast & Reliable!</span>
        </h1>
        <p className="text-xl text-center text-white mb-8 max-w-2xl">
          Your one-stop solution for all mobile phone and gadget needs. Quality
          service guaranteed.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
            Shop Now
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Book a Repair
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Swap Your Device
          </Button>
        </div>
      </div>
    </section>
  );
}

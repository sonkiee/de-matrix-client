import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export function StoreHeroSection() {
  return (
    <section className="bg-muted py-6 md:py-12">
      <div className="container grid items-center gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            New iPhone 15 Pro
          </h1>
          <p className="text-muted-foreground md:text-lg">
            Experience the power of the latest A17 Pro chip and a titanium
            design.
          </p>
          <div className="flex gap-4">
            <Button size="lg">Shop Now</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="iPhone 15 Pro"
            width={400}
            height={400}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}

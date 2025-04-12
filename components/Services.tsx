import { RefreshCw, ShoppingBag, Wrench } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<ShoppingBag className="h-12 w-12 text-blue-600" />}
            title="Buy"
            description="Shop the latest smartphones, tablets, and accessories from top brands at competitive prices."
          />
          <ServiceCard
            icon={<RefreshCw className="h-12 w-12 text-blue-600" />}
            title="Swap"
            description="Trade in your old device for a new one. Get fair value and upgrade to the latest technology."
          />
          <ServiceCard
            icon={<Wrench className="h-12 w-12 text-blue-600" />}
            title="Repair"
            description="Professional repair services for all major brands. Fast turnaround and quality parts guaranteed."
          />
        </div>
      </div>
    </section>
  );
}

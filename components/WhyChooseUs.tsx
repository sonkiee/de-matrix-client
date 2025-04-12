import { FeatureCard } from "./FeaturedCard";
export function WhyChooseUs() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Fast Service"
            description="Most repairs completed same-day or within 24 hours."
          />
          <FeatureCard
            title="Genuine Parts"
            description="We only use authentic parts for all repairs."
          />
          <FeatureCard
            title="Expert Technicians"
            description="Certified professionals with years of experience."
          />
          <FeatureCard
            title="Warranty"
            description="All repairs and products come with warranty."
          />
        </div>
      </div>
    </section>
  );
}

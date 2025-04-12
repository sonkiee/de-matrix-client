import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ProductCard } from "./ProductCard";

export function StoreProducts() {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Featured Products
        </h2>
        <Tabs defaultValue="all" className="mt-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="smartphones">Smartphones</TabsTrigger>
            <TabsTrigger value="laptops">Laptops</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[...Array(10)].map((_, i) => (
                <ProductCard key={i} index={i} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="smartphones" className="mt-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <ProductCard key={i} index={i} category="smartphone" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="laptops" className="mt-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <ProductCard key={i} index={i} category="laptop" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="accessories" className="mt-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <ProductCard key={i} index={i} category="accessory" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

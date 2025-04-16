import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { AddToCartButton } from "./add-to-cart-bitton";

export function BestSellers() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {" "}
        <h3 className="text-2xl font-semibold text-center mb-8">
          Best Sellers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "iPhone 15 Pro", price: "$999" },
            { name: "Samsung Galaxy S23", price: "$899" },
            { name: "Google Pixel 8", price: "$799" },
            { name: "iPad Air", price: "$599" },
          ].map((product, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <Image
                  src={`/placeholder.svg?height=200&width=300&text=${product.name}`}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-blue-600 font-bold">{product.price}</p>
                {/* <Button className="w-full mt-2 bg-orange-500 hover:bg-orange-600">
                  Add to Cart
                </Button> */}
                <AddToCartButton
                  product={product}
                  className="w-full mt-2 bg-orange-500 hover:bg-orange-600"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

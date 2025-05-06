import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";

const Payment = ({ setStep }) => {
  return (
    <TabsContent value="payment" className="mt-0">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <RadioGroup defaultValue="credit-card" className="mt-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="font-medium">
                  Credit Card
                </Label>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=36"
                  alt="Visa"
                  width={36}
                  height={24}
                />
                <Image
                  src="/placeholder.svg?height=24&width=36"
                  alt="Mastercard"
                  width={36}
                  height={24}
                />
                <Image
                  src="/placeholder.svg?height=24&width=36"
                  alt="Amex"
                  width={36}
                  height={24}
                />
              </div>
            </div>
            {/* <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="font-medium">
                  PayPal
                </Label>
              </div>
              <Image
                src="/placeholder.svg?height=24&width=72"
                alt="PayPal"
                width={72}
                height={24}
              />
            </div> */}
          </RadioGroup>

          {/* <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name-on-card">Name on Card</Label>
              <Input id="name-on-card" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="save-card" />
              <label
                htmlFor="save-card"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Save this card for future payments
              </label>
            </div>
          </div> */}

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setStep("shipping")}>
              Back to Shipping
            </Button>
            <Button onClick={() => setStep("review")}>Review Order</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Payment;

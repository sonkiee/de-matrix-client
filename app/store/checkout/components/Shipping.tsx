import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";

const Shipping = ({ setStep, user }) => {
  return (
    <TabsContent value="shipping" className="mt-0">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Shipping Information</h2>
          <div className="mt-4 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" contentEditable={false} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="us">
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="save-address" />
              <label
                htmlFor="save-address"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Save this address for future orders
              </label>
            </div>
          </div>

          <h2 className="mt-8 text-lg font-semibold">Shipping Method</h2>
          <RadioGroup defaultValue="standard" className="mt-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="font-medium">
                  Standard Shipping
                </Label>
              </div>
              <div className="text-sm">
                <span className="font-semibold">$9.99</span>
                <span className="ml-2 text-muted-foreground">
                  (3-5 business days)
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="font-medium">
                  Express Shipping
                </Label>
              </div>
              <div className="text-sm">
                <span className="font-semibold">$19.99</span>
                <span className="ml-2 text-muted-foreground">
                  (1-2 business days)
                </span>
              </div>
            </div>
          </RadioGroup>

          <div className="mt-8 flex justify-end">
            <Button onClick={() => setStep("payment")}>
              Continue to Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Shipping;

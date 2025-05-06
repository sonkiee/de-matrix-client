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
import React, { useState } from "react";
import { useGetAddress } from "@/queries/user";
import { useCreateAddress, useCreateOrder } from "@/hooks/mutation";
import { NIGERIAN_STATES_OPTIONS } from "@/constants";
import { useCart } from "@/context/cart-context";

const Shipping = ({ setStep }) => {
  const { mutate: createAddress } = useCreateAddress();
  const { mutate: createOrder } = useCreateOrder();
  const { data: addresses } = useGetAddress();
  const { cart, setOrderId } = useCart();
  console.log("fecthed address", addresses);

  const [form, setForm] = useState({
    // firstName: "",
    // lastName: "",
    // phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "NG",
    shippingMethod: "standard",
    saveAddress: false,
  });

  const handleProceed = () => {
    const addressPayload = {
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      country: form.country,
      shippingMethod: form.shippingMethod,
      saveAddress: form.saveAddress,
    };

    const proceedToOrder = (addressId: string | null) => {
      // Construct orderPayload (including addressId if needed)
      const orderPayload = {
        shippingAddress: addressId,
        products: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      createOrder(orderPayload, {
        onSuccess: (data) => {
          setOrderId(data?.data?._id); // use saved address ID
          setStep("payment");
        },
      });
    };

    createAddress(addressPayload, {
      onSuccess: (data) => {
        proceedToOrder(data?.data?._id); // use saved address ID
      },
    });
  };

  return (
    <TabsContent value="shipping" className="mt-0">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Shipping Information</h2>
          <div className="mt-4 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  // value={form.firstName}
                  // defaultValue={user?.name}
                  // onChange={(e) =>
                  //   setForm({ ...form, firstName: e.target.value })
                  // }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="first-name"
                  // value={form.firstName}
                  // onChange={(e) =>
                  //   setForm({ ...form, firstName: e.target.value })
                  // }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="first-name"
                // value={form.firstName}
                // defaultValue={user?.email}
                // onChange={(e) =>
                //   setForm({ ...form, firstName: e.target.value })
                // }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                // value={form.firstName}
                // onChange={(e) =>
                //   setForm({ ...form, firstName: e.target.value })
                // }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select
                  value={form.state}
                  onValueChange={(value) => setForm({ ...form, state: value })}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {NIGERIAN_STATES_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                />
              </div>
              {/* <div className="space-y-2">
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
              </div> */}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="save-address"
                checked={form.saveAddress}
                onCheckedChange={(checked) =>
                  setForm({ ...form, saveAddress: checked === true })
                }
              />

              <label
                htmlFor="save-address"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Save this address for future orders
              </label>
            </div>
          </div>

          <h2 className="mt-8 text-lg font-semibold">Shipping Method</h2>
          <RadioGroup
            defaultValue="standard"
            value={form.shippingMethod}
            onValueChange={(value) =>
              setForm({ ...form, shippingMethod: value })
            }
            className="mt-4"
          >
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
            {/* () => setStep("payment") */}
            <Button onClick={handleProceed}>Continue to Payment</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Shipping;

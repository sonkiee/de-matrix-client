import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Plus, Trash2 } from "lucide-react";
import React from "react";

const AddressesSection = ({ activeTab }) => {
  return (
    <>
      {" "}
      {activeTab === "addresses" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Shipping Addresses</CardTitle>
                <CardDescription>
                  Manage your shipping addresses.
                </CardDescription>
              </div>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Address
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative rounded-lg border p-4">
                  <Badge className="absolute right-2 top-2">Default</Badge>
                  <div className="space-y-1">
                    <h3 className="font-medium">Home</h3>
                    <p className="text-sm">John Doe</p>
                    <p className="text-sm">123 Main Street</p>
                    <p className="text-sm">San Francisco, CA 94107</p>
                    <p className="text-sm">United States</p>
                    <p className="text-sm">(123) 456-7890</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="relative rounded-lg border p-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">Work</h3>
                    <p className="text-sm">John Doe</p>
                    <p className="text-sm">456 Market Street</p>
                    <p className="text-sm">San Francisco, CA 94105</p>
                    <p className="text-sm">United States</p>
                    <p className="text-sm">(123) 456-7890</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Billing Addresses</CardTitle>
                <CardDescription>
                  Manage your billing addresses.
                </CardDescription>
              </div>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Address
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4">
                <Badge className="mb-2">Same as shipping</Badge>
                <div className="space-y-1">
                  <h3 className="font-medium">Home</h3>
                  <p className="text-sm">John Doe</p>
                  <p className="text-sm">123 Main Street</p>
                  <p className="text-sm">San Francisco, CA 94107</p>
                  <p className="text-sm">United States</p>
                  <p className="text-sm">(123) 456-7890</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AddressesSection;

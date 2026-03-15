"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { createProductSchema, CreateProductData } from "@/schema";
import { Button } from "@/components/ui/button";

export default function CreateProduct() {
  const form = useForm<CreateProductData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      categoryId: "",
      brandId: "",
      model: "",
      series: "",
      specs: {},
      isActive: true,
      isFeatured: false,
      isBestSeller: false,
      isNewArrival: false,
      variants: [
        {
          sku: "",
          condition: "",
          storage: undefined,
          color: "",
          price: 0,
          compareAtPrice: undefined,
          stockQty: 0,
          isActive: true,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const handleFormSubmit = (data: CreateProductData) => {
    console.log("Product submitted:", data);
    alert("Check console for submitted data.");
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-10"
        >
          {/* General Information */}
          <section className="space-y-6">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              General Information
            </h2>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="product-title-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the product..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {/* <section className="space-y-6">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              Product Specs
            </h2>

            {form.watch("specs") &&
              Object.entries(form.watch("specs")).map(([key, value], index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-2 items-center mb-2"
                >
                  <FormField
                    control={form.control}
                    name={`specs.${key}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value for {key}</FormLabel>
                        <FormControl>
                          <Input placeholder="Value" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button
                    type="button"
                    className="text-red-600 hover:underline"
                    onClick={() => {
                      const currentSpecs = { ...form.getValues("specs") };
                      delete currentSpecs[key];
                      form.setValue("specs", currentSpecs);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}

            <div className="flex gap-2">
              <Input
                placeholder="Spec key"
                value={form.watch("newSpecKey") || ""}
                onChange={(e) => form.setValue("newSpecKey", e.target.value)}
              />
              <Input
                placeholder="Spec value"
                value={form.watch("newSpecValue") || ""}
                onChange={(e) => form.setValue("newSpecValue", e.target.value)}
              />
              <button
                type="button"
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={() => {
                  const key = form.getValues("newSpecKey");
                  const value = form.getValues("newSpecValue");
                  if (!key) return;
                  form.setValue("specs", {
                    ...form.getValues("specs"),
                    [key]: value,
                  });
                  form.setValue("newSpecKey", "");
                  form.setValue("newSpecValue", "");
                }}
              >
                Add Spec
              </button>
            </div>
          </section> */}
          {/* Inventory & Pricing */}
          <section className="space-y-6">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              Inventory & Pricing
            </h2>

            <div className="flex flex-row gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Category</FormLabel>
                    <Controller
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ceramics">Ceramics</SelectItem>
                            <SelectItem value="furniture">Furniture</SelectItem>
                            <SelectItem value="lighting">Lighting</SelectItem>
                            <SelectItem value="textiles">Textiles</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Brand</FormLabel>
                    <Controller
                      control={form.control}
                      name="brandId"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brandA">Brand A</SelectItem>
                            <SelectItem value="brandB">Brand B</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Model name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
          {/* Variants */}
          <section className="space-y-6">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              Product Variants
            </h2>

            {fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-3 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name={`variants.${index}.sku`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="SKU-12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.condition`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <FormControl>
                        <Input placeholder="New / Used" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.stockQty`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Qty</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="Color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-end gap-2">
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:underline"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              className="text-green-600 hover:underline"
              variant={"secondary"}
              onClick={() =>
                append({
                  sku: "",
                  condition: "",
                  storage: undefined,
                  color: "",
                  price: 0,
                  compareAtPrice: undefined,
                  stockQty: 0,
                  isActive: true,
                })
              }
            >
              Add Variant
            </Button>
          </section>
          {/* Actions */}
          <footer className="pt-8 flex items-center justify-end gap-4 border-t border-slate-200">
            <Button
              type="button"
              //   className="px-6 py-2.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button type="submit" variant={"default"}>
              Save Product
            </Button>
          </footer>
        </form>
      </Form>
    </main>
  );
}

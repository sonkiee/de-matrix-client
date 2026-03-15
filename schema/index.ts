import * as z from "zod";

export const signinSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const productVariantSchema = z.object({
  sku: z.string().max(80, "SKU cannot exceed 80 characters").optional(),

  condition: z.string().min(1, "Condition is required"),

  storage: z
    .number()
    .int("Storage must be a whole number")
    .positive("Storage must be a positive number")
    .optional(),

  color: z.string().max(60, "Color cannot exceed 60 characters").optional(),

  price: z.number().min(0, "Price must be a positive number"),

  compareAtPrice: z
    .number()
    .min(0, "Compare price must be positive")
    .optional(),

  stockQty: z
    .number()
    .int("Stock quantity must be a whole number")
    .min(0, "Stock quantity cannot be negative"),

  isActive: z.boolean().optional(),
});

export const createProductSchema = z.object({
  title: z
    .string()
    .min(1, "Product title is required")
    .max(200, "Title cannot exceed 200 characters"),

  slug: z
    .string()
    .min(1, "Slug is required")
    .max(220, "Slug cannot exceed 220 characters"),

  categoryId: z.string().uuid("Invalid category ID"),

  brandId: z.string().uuid("Invalid brand ID").optional(),

  model: z.string().max(160, "Model cannot exceed 160 characters").optional(),

  series: z.string().max(160, "Series cannot exceed 160 characters").optional(),

  description: z.string().min(1, "Product description is required"),

  specs: z.record(z.string(), z.any()).optional(),

  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),

  variants: z
    .array(productVariantSchema)
    .min(1, "At least one product variant is required"),
});

export const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),

  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

const base = z.object({
  items: z.array(
    z.object({
      variantId: z.string(),
      qty: z.number().min(1),
    }),
  ),
  deliveryMethod: z.enum(["pickup", "delivery"]),
});

export const createOrderSchema = z.union([
  base.extend({
    addressId: z.string().min(1),
    shippingAddress: shippingSchema.optional(),
  }),
  base.extend({
    addressId: z.string().optional(),
    shippingAddress: shippingSchema,
  }),
]);

export const initPaymentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
});

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.email("Invalid email address").optional(),
});

export const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export type ProfileData = z.infer<typeof profileSchema>;
export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;

export type CreateProductData = z.infer<typeof createProductSchema>;
export type ProductVariantData = z.infer<typeof productVariantSchema>;
export type SigninData = z.infer<typeof signinSchema>;
export type ShippingData = z.infer<typeof shippingSchema>;
export type CreateOrderData = z.infer<typeof createOrderSchema>;

import * as z from "zod";

export const signinSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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

export type SigninData = z.infer<typeof signinSchema>;
export type ShippingData = z.infer<typeof shippingSchema>;
export type CreateOrderData = z.infer<typeof createOrderSchema>;

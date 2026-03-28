export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export type ProductFilter = {
  priceRange?: [number, number];
  brand?: string;
  storage?: number;
  condition?: string;
  processor?: string;
  ram?: number;
  category?: string;
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
};

export type ProductVariant = {
  id: string;
  productId: string;
  condition: "new" | "used" | "nigerian_used" | "refurbished";
  storage?: number | null;
  color?: string | null;
  price: number; // numeric -> string
  compareAtPrice?: string | null;
  stockQty: number;
  isActive: boolean;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;

  specs?: Record<string, string | number> | null;

  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  inStock: boolean;

  brand: { id: string; name: string };
  category: { id: string; name: string };

  images: { url: string }[];
  variants: ProductVariant[];

  isNewArrival: boolean;
  discount: number;
};

export interface OrderProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  product: string;
  variant: string;
}

export interface Order {
  id: number;
  status: string;
  total: number;
  totalAmount: number;
  createdAt: string;
  products: OrderProduct[];
}

export interface OrderHistoryProps {
  loading: boolean;
  error: Error | null;
  data: { orders: Order[] };
}

export interface Category {
  _id: string;
  name: string;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export type OrderItem = {
  id: string;
  orderId: string;
  variantId: string;
  productTitleSnapshot: string;
  qty: number;
  unitPrice: string;
  createdAt: string;

  variantSnapshot: {
    sku: string;
    color: string;
    storage: number;
    condition: string;
  };
};

export type OrderItems = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  deliveryMethod: "pickup" | "delivery";
  items: OrderItem[];
  subtotal: string;
  total: string;
  shippingFee: string;
  discountTotal: string;
  createdAt: string;
  updatedAt: string;

  addressId: string | null;
  shippingAddressSnapshot?: {
    city: string;
    state: string;
    phone: string;
    addressLine?: string;
  };

  userId: string;
};

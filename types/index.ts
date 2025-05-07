export type User = {
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;
  //   orders: Order[];
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
};

export interface Product {
  _id: string;
  name: string;
  discount: number;
  isNew?: boolean;
  price: number;
  description?: string;
  originalPrice: number;
  brand: string;
  category?: string | undefined;
}

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

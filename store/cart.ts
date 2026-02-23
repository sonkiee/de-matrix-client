import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  brand: string;
  qty: number;
  image?: string;
  variant?: string;
};

type CartState = {
  items: CartItem[];

  totalItems: () => number;
  subtotal: () => number;

  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string, variant?: string) => void;

  increment: (id: string, variant?: string) => void;
  decrement: (id: string, variant?: string) => void;
  clear: () => void;
};

const keyOf = (id: string, variant?: string) =>
  variant ? `${id}::${variant}` : id;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      totalItems: () =>
        get().items.reduce((total, item) => total + item.qty, 0),

      subtotal: () =>
        get().items.reduce((total, item) => total + item.price * item.qty, 0),

      add: (item, qty = 1) => {
        const safeQty = Math.max(1, Math.floor(qty));
        const k = keyOf(item.id, item.variant);
        set((state) => {
          const idx = state.items.findIndex(
            (i) => keyOf(i.id, i.variant) === k,
          );

          if (idx === -1) {
            return { items: [...state.items, { ...item, qty: safeQty }] };
          }
          const items = [...state.items];
          items[idx] = { ...items[idx], qty: items[idx].qty + safeQty };
          return { items };
        });
      },

      remove: (id, variant) => {
        const k = keyOf(id, variant);
        set((state) => ({
          items: state.items.filter((x) => keyOf(x.id, x.variant) !== k),
        }));
      },

      setQty: (id: string, qty: number, variant?: string) => {
        const k = keyOf(id, variant);
        const safeQty = Math.max(0, Math.floor(qty));
        set((state) => {
          const items = state.items
            .map((x) =>
              keyOf(x.id, x.variant) === k ? { ...x, qty: safeQty } : x,
            )
            .filter((x) => x.qty > 0);
          return { items };
        });
      },

      increment: (id, variant) => {
        const k = keyOf(id, variant);
        set((state) => ({
          items: state.items.map((x) =>
            keyOf(x.id, x.variant) === k ? { ...x, qty: x.qty + 1 } : x,
          ),
        }));
      },

      decrement: (id, variant) => {
        const k = keyOf(id, variant);
        set((state) => {
          const items = state.items
            .map((x) =>
              keyOf(x.id, x.variant) === k ? { ...x, qty: x.qty - 1 } : x,
            )
            .filter((x) => x.qty > 0);
          return { items };
        });
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);

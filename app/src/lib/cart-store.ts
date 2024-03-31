import { create } from "zustand";
import { CartItem, Product } from "./types";

interface CartState {
  itemCount: () => number;
  total: () => number;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  itemCount: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
  total: () => get().cart.reduce((acc, item) => acc + item.amount, 0),
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1, amount: item.price * (item.quantity + 1) }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1, amount: product.price }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity, amount: item.price * quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));

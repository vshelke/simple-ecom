import { create } from "zustand";
import { CartItem, Product } from "./types";
import { CartRepository } from "./cart-repository";
import { toast } from "sonner";

interface CartState {
  cart: CartItem[];
  itemCount: () => number;
  total: () => number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  itemCount: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
  total: () => get().cart.reduce((acc, item) => acc + item.amount, 0),
  addToCart: (product) => {
    const currentCart = get().cart;
    const existingItem = currentCart.find((item) => item.id === product.id);
    if (existingItem) {
      const quantity = existingItem.quantity + 1;
      CartRepository.addToCart({ product_id: product.id, quantity })
        .then(() => {
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    amount: item.price * (item.quantity + 1),
                  }
                : item
            ),
          });
        })
        .catch(() => {
          toast.error("Failed to add item to cart");
        });
    } else {
      CartRepository.addToCart({ product_id: product.id })
        .then(() => {
          set({
            cart: [
              ...currentCart,
              { ...product, quantity: 1, amount: product.price },
            ],
          });
        })
        .catch(() => {
          toast.error("Failed to add item to cart");
        });
    }
  },
  removeFromCart: (productId) => {
    const currentCart = get().cart;
    CartRepository.removeCartItem(productId)
      .then(() => {
        set({
          cart: currentCart.filter((item) => item.id !== productId),
        });
      })
      .catch(() => {
        toast.error("Failed to remove item from cart");
      });
  },
  updateQuantity: (productId, quantity) => {
    const currentCart = get().cart;
    CartRepository.updateCartItem({ product_id: productId, quantity })
      .then(() => {
        set({
          cart: currentCart.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity,
                  amount: item.price * quantity,
                }
              : item
          ),
        });
      })
      .catch(() => {
        toast.error("Failed to update item quantity");
      });
  },
  clearCart: () => {
    CartRepository.removeCartItem()
      .then(() => {
        set({
          cart: [],
        });
      })
      .catch(() => {
        toast.error("Failed to clear cart");
      });
  },
}));

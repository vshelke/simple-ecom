import React from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { Product } from "@/lib/types";
import { Minus, Plus } from "lucide-react";

export interface IAddToCart {
  product: Product;
}

const AddToCart: React.FC<IAddToCart> = ({ product }) => {
  const cartProduct = useCartStore((state) =>
    state.cart.find((item) => item.id === product.id)
  );

  return (
    cartProduct?.quantity ? (
      <div className="flex items-center gap-2">
        <Button
          onClick={() => useCartStore.getState().updateQuantity(product.id, cartProduct.quantity - 1)}
        >
          <Minus />
        </Button>
        <span className="text-2xl">{cartProduct.quantity}</span>
        <Button onClick={() => useCartStore.getState().updateQuantity(product.id, cartProduct.quantity + 1)}>
          <Plus />
        </Button>
      </div>
    ) : (
      <Button onClick={() => useCartStore.getState().addToCart(product)}>
        Add to Cart
      </Button>
    )
  );
};

AddToCart.defaultProps = {};

export default AddToCart;

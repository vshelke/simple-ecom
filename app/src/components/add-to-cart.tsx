import React from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { Product } from "@/lib/types";
import { Minus, Plus } from "lucide-react";

export interface IAddToCart {
  className?: string;
  product: Product;
  isSmall?: boolean;
}

const AddToCart: React.FC<IAddToCart> = ({ product, className, isSmall }) => {
  const cartProduct = useCartStore((state) =>
    state.cart.find((item) => item.id === product.id)
  );

  return cartProduct?.quantity ? (
    <div className={`inline-flex justify-between items-center gap-2 border rounded-full ${className}`}>
      <Button
        className="rounded-l-full"
        size="icon"
        variant="ghost"
        onClick={() =>
          useCartStore
            .getState()
            .updateQuantity(product.id, cartProduct.quantity - 1)
        }
      >
        <Minus className="w-4 h-4"/>
      </Button>
      <span className="text-base">{cartProduct.quantity}</span>
      <Button
        className="rounded-r-full"
        size="icon"
        variant="ghost"
        onClick={() =>
          useCartStore
            .getState()
            .updateQuantity(product.id, cartProduct.quantity + 1)
        }
        disabled={product.stock <= cartProduct.quantity}
      >
        <Plus className="w-4 h-4"/>
      </Button>
    </div>
  ) : (
    <Button
      onClick={() => useCartStore.getState().addToCart(product)}
      disabled={product.stock <= 0}
      className={className}
    >
      Add to Cart
    </Button>
  );
};

AddToCart.defaultProps = {};

export default AddToCart;

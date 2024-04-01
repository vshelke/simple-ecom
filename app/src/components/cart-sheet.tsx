import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { ShoppingCart, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import AddToCart from "./add-to-cart";
import { CartRepository } from "@/lib/cart-repository";

export interface ICartSheet {}

const CartSheet: React.FC<ICartSheet> = ({}) => {
  const cart = useCartStore((state) => state.cart);
  const count = useCartStore((state) => state.itemCount());

  useEffect(() => {
    CartRepository.getCart().then((items) => {
      useCartStore.setState({ cart: items });
    });
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="secondary" size="icon" className="rounded-full">
          <ShoppingCart className="h-5 w-5" />
          <Badge className="absolute mb-8 ml-8 rounded-full px-1.5 py-0.5 text-xs">
            {count}
          </Badge>
          <span className="sr-only">Shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>All your cart items in one place.</SheetDescription>
        </SheetHeader>
        <div className="mt-7">
          {cart.map((item) => (
            <div key={item.id} className="flex items-start my-5 gap-3">
              <div className="border rounded-lg py-2 shadow-sm w-1/5 h-16">
                <Image
                  className="rounded-lg object-contain mx-auto h-full"
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex-1">
                <h3 className="line-clamp-1 font-medium mb-1">{item.title}</h3>
                <p className=" text-lg mb-3">${item.price}</p>
                <div className="flex space-x-2">
                  <AddToCart product={item} />
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 rounded-full"
                    onClick={() => {
                      useCartStore.getState().removeFromCart(item.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="w-1/5">
                <p className="text-lg font-semibold text-right">
                  ${item.amount.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <SheetFooter className="items-center my-10">
          <div className="flex items-center space-x-2 w-1/2">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">
              ${useCartStore.getState().total().toFixed(2)}
            </p>
          </div>
          <div className="flex-1">
            <Button
              disabled={!cart.length}
              variant="outline"
              className="w-full"
              onClick={() => {
                useCartStore.getState().clearCart();
              }}
            >
              <Trash className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

CartSheet.defaultProps = {};

export default CartSheet;

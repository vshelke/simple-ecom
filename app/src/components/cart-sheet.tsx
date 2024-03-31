import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export interface ICartSheet {}

const CartSheet: React.FC<ICartSheet> = ({}) => {
  const cart = useCartStore((state) => state.cart);
  const count = useCartStore((state) => state.itemCount());

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
          <SheetDescription>
            All your cart items in one place. Ready to checkout?
          </SheetDescription>
        </SheetHeader>
        <div className="mt-7">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center my-5">
              <div>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={70}
                  height={70}
                />
              </div>
              <div className="flex-1 ml-3">
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>
                <Button variant="outline">Remove</Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

CartSheet.defaultProps = {};

export default CartSheet;

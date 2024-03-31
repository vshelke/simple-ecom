import React from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import AddToCart from "./add-to-cart";
import { Button } from "./ui/button";
import Link from "next/link";
import { Star } from "lucide-react";
import Rating from "./rating";

export interface IProductCard {
  product: Product;
}

const ProductCard: React.FC<IProductCard> = ({ product }) => {
  return (
    <div className="space-y-3">
      <div className="border rounded-lg h-60 py-5 shadow-sm">
        <Image
          className="rounded-lg object-contain mx-auto h-full"
          src={product.image}
          alt={product.title}
          width={240}
          height={240}
        />
      </div>
      <div>
        <h3 className="font-medium text-lg line-clamp-1">{product.title}</h3>
        <div className="text-base text-muted-foreground capitalize">
          {product.category}
        </div>
        <Rating rating={product.rating} />
        <div className="text-xl font-semibold">${product.price}</div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <AddToCart className="w-1/2" product={product} />
        <Button className="w-1/2" variant="outline" asChild>
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
};

ProductCard.defaultProps = {};

export default ProductCard;

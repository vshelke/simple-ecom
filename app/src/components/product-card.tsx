import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/lib/types";
import AddToCart from "./add-to-cart";
import { Button } from "./ui/button";
import Link from "next/link";

export interface IProductCard {
  product: Product;
}

const ProductCard: React.FC<IProductCard> = ({ product }) => {
  return (
    <Card key={product.id}>
      <CardHeader>
        <div className="h-40 overflow-hidden mb-5">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <h3 className="font-medium text-base">{product.title}</h3>
          <div className="text-sm text-muted-foreground capitalize">
            {product.category}
          </div>
          <div className="text-lg font-semibold">${product.price}</div>
          <div>
            <AddToCart product={product} />
            <Button variant="outline" asChild>
              <Link href={`/products/${product.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ProductCard.defaultProps = {};

export default ProductCard;

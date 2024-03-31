import ProductCard from "@/components/product-card";
import { Product } from "@/lib/types";
import React from "react";

export interface IProductListing {
  title: string;
  products: Product[];
}

const ProductListing: React.FC<IProductListing> = ({ title, products }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 animate-fade">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold w-1/2">{title}</h2>
      </div>
      <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

ProductListing.defaultProps = {};

export default ProductListing;

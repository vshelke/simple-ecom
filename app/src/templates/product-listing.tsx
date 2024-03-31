import Paginate from "@/components/paginate";
import ProductCard from "@/components/product-card";
import { Product } from "@/lib/types";
import { randomColor } from "@/lib/utils";
import { Bird } from "lucide-react";
import React from "react";

export interface IProductListing {
  title: string;
  products: Product[];
}

const ProductListing: React.FC<IProductListing> = ({ title, products }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold w-1/2">{title}</h2>
        <Paginate className="w-1/2 justify-end" />
      </div>
      {products.length === 0 && (
        <div className="mx-auto h-full my-auto">
          <Bird className={`w-32 h-32 mx-auto text-${randomColor()}-500`} />
          <p className="text-2xl text-muted-foreground">No products found</p>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

ProductListing.defaultProps = {};

export default ProductListing;

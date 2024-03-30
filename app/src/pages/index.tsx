import Header from "@/components/header";
import ProductCard from "@/components/product-card";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3301/api/ecom/products/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h2 className="text-xl font-semibold">All Products</h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {(data as any).results?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

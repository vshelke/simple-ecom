import Layout from "@/components/layout";
import React, { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { Product } from "@/lib/types";
import Image from "next/image";
import AddToCart from "@/components/add-to-cart";

export interface IProductDetailPage {}

const ProductDetailPage: NextPageWithLayout<IProductDetailPage> = ({}) => {
  const router = useRouter();
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3301/api/ecom/products/${router.query.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [router]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold w-1/2">
          <Image src={data.image} alt={data.title} width={500} height={500} />
        </div>
        <div className="w-1/2"> 
          <h2 className="text-xl font-semibold ">{data.title}</h2>
          <p>{data.description}</p>
          <p>${data.price}</p>
          <AddToCart product={data} />
        </div>
      </div>
    </main>
  );
};

ProductDetailPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ProductDetailPage;

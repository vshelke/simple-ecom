import Layout from "@/components/layout";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { Product } from "@/lib/types";
import Image from "next/image";
import AddToCart from "@/components/add-to-cart";
import Rating from "@/components/rating";
import { useFetch } from "@/lib/hooks";
import LoadingPage from "@/templates/loading";
import ErrorPage from "@/templates/error";
import NoDataPage from "@/templates/no-data";

export interface IProductDetailPage {}

const ProductDetailPage: NextPageWithLayout<IProductDetailPage> = ({}) => {
  const router = useRouter();
  const { productId } = router.query;
  const { data, loading, error } = useFetch<Product>(
    `${process.env.NEXT_PUBLIC_API_HOST}/ecom/products/${productId}`
  );

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={(error as any)?.message} />;
  if (!data)
    return <NoDataPage message="Product details could not be found." />;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 animate-fade">
      <div className="md:flex items-start justify-between gap-10">
        <div className="border rounded-lg py-5 shadow-sm md:w-1/2 md:h-[500px] h-[250px]">
          <Image
            className="rounded-lg object-contain mx-auto h-full"
            src={data.image}
            alt={data.title}
            width={500}
            height={500}
          />
        </div>
        <div className="md:w-1/2 grid gap-3 my-7">
          <div>
            <h2 className="md:text-4xl text-3xl font-normal mb-2">
              {data.title}
            </h2>
            <p className="text-lg text-muted-foreground">{data.description}</p>
          </div>
          <Rating rating={data.rating} />
          <p className="text-2xl font-semibold mb-2">${data.price}</p>
          <div>
            <AddToCart product={data} />
          </div>
        </div>
      </div>
    </main>
  );
};

ProductDetailPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ProductDetailPage;

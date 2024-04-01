import Layout from "@/components/layout";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { useFetch } from "@/lib/hooks";
import { ProductsResponse } from "@/lib/types";
import LoadingPage from "@/templates/loading";
import Errorpage from "@/templates/error";
import NoDataPage from "@/templates/no-data";
import ProductListing from "@/templates/product-listing";

export interface ICategoryPage {}

const CategoryPage: NextPageWithLayout<ICategoryPage> = ({}) => {
  const router = useRouter();
  const { categoryId } = router.query
  const { data, loading, error } = useFetch<ProductsResponse>(
    `${process.env.NEXT_PUBLIC_API_HOST}/ecom/products/?category_id=${categoryId}`
  );

  if (loading) return <LoadingPage />;
  if (error) return <Errorpage error={(error as any)?.message} />;
  if (!data || data?.results?.length === 0)
    return <NoDataPage message="No products found" />;

  const firstProduct = data.results?.[0] || {};
  return (
    <ProductListing
      title={firstProduct?.category}
      products={data.results || []}
    />
  );
};

CategoryPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default CategoryPage
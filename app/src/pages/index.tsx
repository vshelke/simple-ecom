import Layout from "@/components/layout";
import { ProductsResponse } from "@/lib/types";
import ProductListing from "@/templates/product-listing";
import { ReactElement } from "react";
import { useFetch } from "@/lib/hooks";
import { NextPageWithLayout } from "./_app";
import LoadingPage from "@/templates/loading";
import Errorpage from "@/templates/error";
import NoDataPage from "@/templates/no-data";

export interface IHomePage {}

const HomePage: NextPageWithLayout<IHomePage> = ({}) => {
  const { data, loading, error } = useFetch<ProductsResponse>(
    `${process.env.NEXT_PUBLIC_API_HOST}/ecom/products/`
  );
  const results = data?.results || [];

  if (loading) return <LoadingPage />;
  if (error) return <Errorpage error={(error as any)?.message} />;
  if (!data || results.length === 0)
    return <NoDataPage message="No products found" />;

  return <ProductListing title="All Products" products={results} />;
};

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;

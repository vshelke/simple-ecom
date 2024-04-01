import Layout from "@/components/layout";
import { ProductsResponse } from "@/lib/types";
import ProductListing from "@/templates/product-listing";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import LoadingPage from "@/templates/loading";
import ErrorPage from "@/templates/error";
import NoDataPage from "@/templates/no-data";
import { useFetch } from "@/lib/hooks";

export interface ISearchPage {}

const SearchPage: NextPageWithLayout<ISearchPage> = ({}) => {
  const router = useRouter();
  const query = router.query.q as string;
  const { data, loading, error } = useFetch<ProductsResponse>(
    `${process.env.NEXT_PUBLIC_API_HOST}/ecom/products/?search=${query}`
  );

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={(error as any)?.message} />;
  if (!data || data.results.length === 0)
    return <NoDataPage message="No products found" />;

  return (
    <ProductListing
      title={`Search Results for "${query}"`}
      products={data.results}
    />
  );
};

SearchPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default SearchPage;

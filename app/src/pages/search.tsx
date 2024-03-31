import Layout from "@/components/layout";
import { Product } from "@/lib/types";
import ProductListing from "@/templates/product-listing";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";

export interface ISearchPage {}

const SearchPage: NextPageWithLayout<ISearchPage> = ({}) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3301/api/ecom/products/?search=${router.query.q}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [router]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <ProductListing
      title={`Search Results for "${router.query.q}"`}
      products={(data as any).results as Product[]}
    />
  );
};

SearchPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default SearchPage;

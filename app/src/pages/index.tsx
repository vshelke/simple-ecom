import Layout from "@/components/layout";
import { Product } from "@/lib/types";
import ProductListing from "@/templates/product-listing";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";

export interface IHomePage {}

const HomePage: NextPageWithLayout<IHomePage> = ({}) => {
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
    <ProductListing
      title="All Products"
      products={(data as any).results as Product[]}
    />
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;

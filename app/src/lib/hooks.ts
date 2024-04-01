import React from "react";
import { refreshToken } from "./utils";

const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const result = await response.json();
  if (result?.code === "token_not_valid") {
    if (await refreshToken()) {
      return await authenticatedFetch(url, options);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
    }
  }
  return result;
};

const useFetch = <T>(url: string) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await authenticatedFetch(url);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export { useFetch, authenticatedFetch };

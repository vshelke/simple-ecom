import React from "react";
import { refreshToken } from "./utils";

const useFetch = <T>(url: string) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (result?.code === "token_not_valid") {
          if (await refreshToken()) {
            const response = await fetch(url, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            const result = await response.json();
            setData(result);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
            window.location.href = "/login";
          }
        } else {
          setData(result);
        }
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

export { useFetch };

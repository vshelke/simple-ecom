import React, { useEffect } from "react";
import Header from "./header";
import { useRouter } from "next/router";

export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("token") || router.push("/login");
  }, [router]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      {children}
    </div>
  );
};

Layout.defaultProps = {};

export default Layout;

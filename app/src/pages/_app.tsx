import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner"
import dynamic from "next/dynamic";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.variable};
        }
      `}</style>
      <main className="min-h-screen bg-background font-sans antialiased">
        <TooltipProvider>
          {getLayout(<Component {...pageProps} />)}
        </TooltipProvider>
        <Toaster />
      </main>
    </>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});

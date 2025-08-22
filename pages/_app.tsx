import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else if (router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router.pathname]);

  if (!isAuthenticated && router.pathname !== "/login") {
    return null;
  }

  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </>
  );
}

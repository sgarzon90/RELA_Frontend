import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    return (
      <ThemeProvider>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </ThemeProvider>
    );
  }

  const showNavbar = isAuthenticated && router.pathname !== "/login";

  return (
    <ThemeProvider>
      <div className="dark:bg-gray-900 dark:text-white min-h-screen">
        {showNavbar && <Navbar />}
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
}

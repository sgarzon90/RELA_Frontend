import type { AppProps } from "next/app"
import "../styles/globals.css"
import { Toaster } from "@/components/ui/toaster"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </>
  )
}

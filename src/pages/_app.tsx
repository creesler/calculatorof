import type { AppProps } from 'next/app'

// Minimal _app.tsx to prevent Next.js scanning errors
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
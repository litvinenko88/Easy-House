import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../styles/globals.css'
import { cleanupUnwantedHeadings } from '../utils/seoCleanup'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    cleanupUnwantedHeadings();
  }, []);

  return <Component {...pageProps} />
}
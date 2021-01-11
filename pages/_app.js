import { AuthProvider } from '@/hooks/AuthContext';
import '@/styles/index.css';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { SWRConfig } from 'swr';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
          }}>
          <Head>
            <title>
              {Component.title && `${Component.title} - `}
              {process.env.NEXT_PUBLIC_SITE_TITLE}
            </title>
            <link rel="icon" href="/icon.png" />
          </Head>
          <Component {...pageProps} />
        </SWRConfig>
      </AuthProvider>
    </ThemeProvider>
  );
}

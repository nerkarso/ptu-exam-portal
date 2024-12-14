import FeedbackWidget from '@/components/FeedbackWidget';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/index.css';
import { pageview } from '@/utils/gtag';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

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
            <meta name="title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
            <meta name="description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
            <meta property="og:title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
            <meta property="og:description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`} />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
            <meta property="twitter:title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
            <meta property="twitter:description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
            <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`} />
            <meta name="theme-color" content="#4f46e5" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" href="/icon-192.png" />
          </Head>
          <Component {...pageProps} />
          <FeedbackWidget />
          <ToastContainer
            position="bottom-center"
            transition={Slide}
            draggable={false}
            autoClose={3000}
            closeButton={false}
            closeOnClick
          />
        </SWRConfig>
      </AuthProvider>
    </ThemeProvider>
  );
}

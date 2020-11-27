import { ThemeProvider } from 'next-themes';
import '../styles/index.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

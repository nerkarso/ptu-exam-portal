import Head from 'next/head';
import Header from '../components/Header';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title && `${title} | `}PTU Exam Portal</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Header />
      <main className="px-4 pb-10 pt-28">
        <div className="container max-w-screen-lg">
          <h1 className="mt-4 text-2xl font-semibold">{title}</h1>
          {children}
        </div>
      </main>
    </>
  );
}

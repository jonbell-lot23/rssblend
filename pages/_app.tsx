import "/styles/globals.css";
import Head from "next/head";
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <meta charSet="UTF-8" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

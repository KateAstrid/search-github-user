import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>The best github search app</title>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

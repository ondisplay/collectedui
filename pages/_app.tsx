import React from 'react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import Head from 'next/head';

import 'tailwindcss/tailwind.css';
import { PropsOf } from '../src/types';

function NextLink(props: PropsOf<'a'>) {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <div className="flex flex-col h-screen overflow-hidden font-sans antialiased text-gray-900 bg-gray-700">
        <header className="relative z-10 flex items-center justify-between flex-shrink-0 px-4 py-4 bg-gray-700 border-b border-gray-200 sm:px-6 lg:px-8">
          <NextLink href="/">Test</NextLink>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;

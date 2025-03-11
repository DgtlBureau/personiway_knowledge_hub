import { Footer } from '@/src/components/Footer/Footer';
import { Header } from '@/src/components/Header/Header';
import { Container } from '@/src/components/shared/Container/Container';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';
import classNames from 'classnames';
import localFont from 'next/font/local';
import Script from 'next/script';
import React from 'react';
import 'swiper/css';
import './globals.css';

const title = pageMetadata.main.title;
const description = pageMetadata.main.description;
const keywords = pageMetadata.main.keywords;

export const metadata = Seo({
  title,
  description,
  keywords,
  ogSiteName: 'Personiway.com',
  ogType: 'website',
});

const Unbound = localFont({
  src: [
    {
      path: '../public/fonts/unbounded/Unbounded-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/unbounded/Unbounded-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/unbounded/Unbounded-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-unbound',
  adjustFontFallback: false,
});

const Proxima = localFont({
  src: [
    {
      path: '../public/fonts/proxima-nova/proxima_nova_regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/proxima-nova/proxima_nova_bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-proxima',
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyClassname = classNames(Unbound.variable, Proxima.variable);
  return (
    <html lang='en'>
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-0PFJQ22253'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0PFJQ22253');
          `}
      </Script>
      <body
        className={`flex flex-col bg-white text-text-dark ${bodyClassname}`}
      >
        <Header />
        <main className='flex flex-col gap-[60px] overflow-hidden'>
          <Container>{children}</Container>
        </main>
        <Footer />
      </body>
    </html>
  );
}

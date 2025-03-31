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
import { GTM_Number } from '@/src/utils/alias';

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
      <body
        className={`flex flex-col bg-white text-text-dark ${bodyClassname}`}
      >
        <Script id='gtm-script' strategy='afterInteractive'>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-${GTM_Number}');
          `}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-${GTM_Number}`}
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Header />
        <main className='flex flex-col gap-[60px] overflow-hidden'>
          <Container>{children}</Container>
        </main>
        <Footer />
      </body>
    </html>
  );
}

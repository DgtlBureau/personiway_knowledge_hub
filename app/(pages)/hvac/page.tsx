import { BASE_URL } from '@/src/alias';
import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getGeneralMetadata } from '@/src/utils/getGeneralMetadata';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { postsSorting } from '@/src/utils/postsSorting';
import { Metadata } from 'next';
import { Suspense } from 'react';

const title = pageMetadata.blog.title;
const description = contentTrimming(pageMetadata.blog.description, 155);
const keywords = pageMetadata.blog.keywords;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/assets/images/info/main_meta.png',
  },
  alternates: {
    canonical: new URL(`${BASE_URL}/hvac`),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'personiway.com',
    ...openGraphImage,
    title,
    description,
    url: `${BASE_URL}/hvac`,
  },
  keywords,
};

const generalArticles = getGeneralMetadata();
const sortedInsightsArticles = postsSorting(generalArticles);

export default function HvacPage() {
  return (
    <div className='h-full w-full'>
      <Suspense fallback={<div className='h-screen w-full bg-white'></div>}>
        <PlaybookClient data={sortedInsightsArticles} />
      </Suspense>
    </div>
  );
}

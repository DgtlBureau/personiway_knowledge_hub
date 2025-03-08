import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { BASE_URL } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getInsightsMetadata } from '@/src/utils/getInsightsMetadata';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { postsSorting } from '@/src/utils/postsSorting';
import { Metadata } from 'next';
import { Suspense } from 'react';

const title = pageMetadata.main.title;
const description = contentTrimming(pageMetadata.main.description, 155);
const keywords = pageMetadata.main.keywords;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/assets/images/info/main_meta.png',
  },
  alternates: {
    canonical: new URL(`${BASE_URL}/hvac/general`),
    types: {
      'application/rss+xml': [
        {
          title: 'Personiway Hvac',
          url: `${BASE_URL}/hvac/general/rss`,
        },
      ],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BrightByte.com',
    ...openGraphImage,
    title,
    description,
    url: `${BASE_URL}/hvac/general`,
  },
  keywords,
};

const insightsArticles = getInsightsMetadata();
const sortedInsightsArticles = postsSorting(insightsArticles);

export default function InsightsPage() {
  return (
    <div className='h-full w-full'>
      <Suspense fallback={<div className='h-screen w-full bg-white'></div>}>
        <PlaybookClient data={sortedInsightsArticles} />
      </Suspense>
    </div>
  );
}

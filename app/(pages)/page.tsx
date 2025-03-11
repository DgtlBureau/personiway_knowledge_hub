import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getAllArticles } from '@/src/utils/getAllArticles';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';
import { Suspense } from 'react';

const title = pageMetadata.main.title;
const description = contentTrimming(pageMetadata.main.description, 155);
const keywords = pageMetadata.main.keywords;

export const metadata = Seo({
  title,
  description,
  alternatesTitle: 'PersoniWay - HVAC Controllers & Automation Knowledge Hub',
  ogSiteName: 'Personiway.com',
  ogType: 'article',
  keywords,
});

const data = getAllArticles();

export default function PlaybookPage() {
  return (
    <Suspense fallback={<div className='h-screen w-full bg-white'></div>}>
      <PlaybookClient data={data} />
    </Suspense>
  );
}

import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getInsightsMetadata } from '@/src/utils/getInsightsMetadata';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { postsSorting } from '@/src/utils/postsSorting';
import { Seo } from '@/src/utils/Seo/Seo';
import { Suspense } from 'react';

const title = pageMetadata.main.title;
const description = contentTrimming(pageMetadata.main.description, 155);
const keywords = pageMetadata.main.keywords;

export const metadata = Seo({
  title,
  description,
  keywords,
  alternatesTitle: 'Personiway HVAC',
  canonicalPath: 'hvac',
  ogType: 'article',
  ogSiteName: 'hub.personiway.com',
  ogUrlPath: 'hvac',
});

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

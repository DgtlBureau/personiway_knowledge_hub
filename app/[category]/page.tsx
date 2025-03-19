import { CategoryComponent } from '@/src/components/PlaybookClient/CategoryComponent/CategoryComponent';
import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { PlaybookHeading } from '@/src/components/PlaybookClient/PlaybookHeading/PlaybookHeading';
import { getAllArticles } from '@/src/utils/getAllArticles';
import { getInsightsMetadata } from '@/src/utils/getInsightsMetadata';
import { postsSorting } from '@/src/utils/postsSorting';
import { Suspense } from 'react';

const data = getAllArticles();

export default function CategorySlug({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { season: string };
}) {
  console.log('params.category', params.category);
  const insightsArticles = getInsightsMetadata(params.category);
  const sortedInsightsArticles = postsSorting(insightsArticles);

  return (
    <div className='flex flex-col'>
      <Suspense>
        <PlaybookHeading />
      </Suspense>
      <div className='mt-[24px] flex flex-col gap-[24px] tablet:mt-[40px] tablet:gap-[40px]  laptop-big:mt-[80px] laptop-big:flex-row laptop-big:gap-[30px]'>
        <h2>Category: {params.category}</h2>
        <Suspense>
          <CategoryComponent category={data} path={params.category} />
        </Suspense>
        <Suspense fallback={<div className='h-screen w-full bg-white'></div>}>
          <PlaybookClient data={sortedInsightsArticles} />
        </Suspense>
      </div>
    </div>
  );
}

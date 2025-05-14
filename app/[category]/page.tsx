import { CategoryComponent } from '@/src/components/PlaybookClient/CategoryComponent/CategoryComponent';
import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { PlaybookHeading } from '@/src/components/PlaybookClient/PlaybookHeading/PlaybookHeading';
import { seoSiteName } from '@/src/utils/alias';
import { getAllArticles } from '@/src/utils/getAllArticles';
import { getInsightsMetadata } from '@/src/utils/getInsightsMetadata';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { postsSorting } from '@/src/utils/postsSorting';
import { Seo } from '@/src/utils/Seo/Seo';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const { title, description, keywords } = pageMetadata['category'];

  return Seo({
    title,
    description,
    keywords,
    ogSiteName: seoSiteName,
    canonicalPath: params.category,
    ogUrlPath: params.category,
    ogType: 'article',
  });
}

export const generateStaticParams = async () => {
  const posts = getInsightsMetadata('');

  const categories = [...new Set(posts.map((post) => post.category))];

  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
};

const data = getAllArticles();

export default function CategorySlug({
  params,
}: {
  params: { category: string };
}) {
  const insightsArticles = getInsightsMetadata(params.category);
  const sortedInsightsArticles = postsSorting(insightsArticles);

  return (
    <div className='flex flex-col'>
      <Suspense>
        <PlaybookHeading />
      </Suspense>
      <div className='mt-[24px] flex flex-col gap-[24px] tablet:mt-[40px] tablet:gap-[40px]  laptop-big:mt-[80px] laptop-big:flex-row laptop-big:gap-[30px]'>
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

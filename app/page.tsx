import { CategoryComponent } from '@/src/components/PlaybookClient/CategoryComponent/CategoryComponent';
import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { PlaybookHeading } from '@/src/components/PlaybookClient/PlaybookHeading/PlaybookHeading';
import { Section } from '@/src/components/shared/Section/Section';
import { maxSeoDescriptionSize, seoSiteName } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getAllArticles } from '@/src/utils/getAllArticles';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';
import { Suspense } from 'react';

const title = pageMetadata.main.title;
const description = contentTrimming(
  pageMetadata.main.description,
  maxSeoDescriptionSize,
);
const keywords = pageMetadata.main.keywords;

export const metadata = Seo({
  title,
  description,
  ogSiteName: seoSiteName,
  ogType: 'article',
  keywords,
});

const data = getAllArticles();

export default function PlaybookPage() {
  return (
    <Section
      id='playbook'
      light
      className='mx-auto w-full py-[30px] laptop-big:py-[60px]'
    >
      <div className='flex flex-col'>
        <Suspense>
          <PlaybookHeading />
        </Suspense>
        <div className='mt-[24px] flex flex-col gap-[24px] tablet:mt-[40px] tablet:gap-[40px]  laptop-big:mt-[80px] laptop-big:flex-row laptop-big:gap-[30px]'>
          <Suspense>
            <CategoryComponent category={data} path='/' />
          </Suspense>

          <Suspense
            fallback={
              <div className='h-screen w-full bg-white'>Loading ...</div>
            }
          >
            <PlaybookClient data={data} />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}

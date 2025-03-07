import { BASE_URL } from '@/src/alias';
import { PlaybookHeading } from '@/src/components/PlaybookClient/PlaybookHeading/PlaybookHeading';
import { Section } from '@/src/components/shared/Section/Section';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { pageMetadata } from '@/src/utils/pageMetadata';
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

export default function PlaybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section
      id='playbook'
      light
      className='tablet:px-[40px] laptop-big:py-[60px] desktop:px-[75px] w-full px-[10px] py-[30px]'
    >
      <div className='flex flex-col'>
        <Suspense>
          <PlaybookHeading />
        </Suspense>
        <div className='tablet:mt-[40px] tablet:gap-[40px] laptop-big:mt-[80px] laptop-big:flex-row laptop-big:gap-[30px] mt-[24px] flex flex-col gap-[24px]'>
          {children}
        </div>
      </div>
    </Section>
  );
}

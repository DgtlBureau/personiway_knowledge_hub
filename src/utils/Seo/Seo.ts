import { BASE_URL, seoSiteName } from '@/src/utils/alias';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { Metadata } from 'next';
import { pageMetadata } from '../pageMetadata';

type IOgType =
  | 'website'
  | 'article'
  | 'book'
  | 'profile'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other';

interface ISeo {
  title: string;
  description: string;
  keywords?: string[];
  alternatesTitle?: string;
  ogType?: IOgType;
  ogSiteName?: string;
  ogImage?: string;
  ogImageAlt?: string;
  canonicalPath?: string;
  rssPath?: string;
  ogUrlPath?: string;
}

const defaultKeywords = pageMetadata.main.keywords;

export function Seo({
  title,
  description,
  alternatesTitle,
  canonicalPath,
  rssPath,
  ogType = 'website',
  keywords,
  ogSiteName,
  ogImage,
  ogImageAlt,
  ogUrlPath,
}: ISeo): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    icons: {
      icon: '/fаvicon.svg',
    },
    alternates: {
      canonical: new URL(`${BASE_URL}/${canonicalPath || ''}`),
      types: alternatesTitle
        ? {
            'application/rss+xml': [
              {
                title: alternatesTitle,
                url: `${BASE_URL}/${rssPath || 'rss'}`,
              },
            ],
          }
        : undefined,
    },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      siteName: ogSiteName || seoSiteName,
      ...openGraphImage(ogImage, ogImageAlt),
      title,
      description,
      url: `${BASE_URL}/${ogUrlPath || ''}`,
    },

    keywords: keywords || defaultKeywords,
  };
}

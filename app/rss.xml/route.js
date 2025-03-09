import { getInsightsMetadata } from '@/src/utils/getInsightsMetadata';
import { DateTime } from 'luxon';
import { NextResponse } from 'next/server';
import RSS from 'rss';

const insights = getInsightsMetadata();

const insightsData = insights.map((item) => {
  return {
    dirName: 'posts',
    ...item,
  };
});
const allData = [...insightsData];

export async function GET() {
  const feed = new RSS({
    title: 'Personiway',
    description:
      'The PersoniWay Knowledge Hub provides detailed insights into BACnet controllers, VAV systems, and smart building automation',
    site_url: 'https://hub.personiway.com/',
    feed_url: 'https://hub.personiway.com/rss',
    copyright: `${new Date().getFullYear()} Personiway`,
    language: 'en-us',
    pubDate: new Date().toUTCString(),
  });

  allData.forEach((item) => {
    const formattedDate = item.date
      ? DateTime.fromFormat(item.date, 'yyyy-MM-dd').toRFC2822()
      : null;
    feed.item({
      title: item.title,
      description: item.description,
      url: `https://hub.personiway.com/hvac/${item.dirName}/${item.slug}`,
      guid: `https://hub.personiway.com/hvac/${item.dirName}/${item.slug}`,
      date: formattedDate,
    });
  });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}

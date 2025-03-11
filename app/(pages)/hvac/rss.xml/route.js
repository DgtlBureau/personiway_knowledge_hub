import { getInsightsMetadata } from '@/src/utils/getInsightsMetadata';
import { DateTime } from 'luxon';
import RSS from 'rss';

const allInsights = getInsightsMetadata();

export async function GET() {
  const feed = new RSS({
    title: 'Bright Byte Insights',
    description: 'Latest insights from Bright Byte',
    site_url: 'https://hub.personiway.com',
    feed_url: `https://hub.personiway.com/hvac/rss.xml`,
    copyright: `${new Date().getFullYear()} Bright Byte Insights`,
    language: 'en-us',
    pubDate: new Date().toUTCString(),
  });

  allInsights.forEach((insight) => {
    const formattedDate = insight.date
      ? DateTime.fromFormat(insight.date, 'yyyy-MM-dd').toRFC2822()
      : null;
    feed.item({
      title: String(insight.title),
      description: String(insight.description),
      guid: `https://hub.personiway.com/hvac/${insight.slug}`,
      url: `https://hub.personiway.com/hvac/${insight.slug}`,
      date: formattedDate,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}

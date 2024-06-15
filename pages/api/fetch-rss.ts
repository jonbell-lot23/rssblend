// pages/api/fetch-rss.ts

import { NextApiRequest, NextApiResponse } from 'next';
import RssParser from 'rss-parser';

interface FeedItem {
  // Define the properties you expect in a feed item
  // This is a basic example, you might need to add more properties
  title: string;
  link: string;
  contentSnippet?: string;
  content?: string;
}

interface ExtendedFeedItem extends FeedItem {
  // Any additional properties you expect from the parser
}

interface FeedResult {
  items: ExtendedFeedItem[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { urls } = req.query;

  if (!urls || typeof urls !== 'string') {
    return res.status(400).json({ error: 'URLs must be provided as a comma-separated string.' });
  }

  const urlArray = urls.split(',').map(url => url.trim()).filter(url => url);
  const parser = new RssParser();

  try {
    const feedPromises = urlArray.map(url => parser.parseURL(url) as Promise<FeedResult>);
    const feeds = await Promise.allSettled(feedPromises);

    const allFeedItems = feeds.reduce((items: ExtendedFeedItem[], feedResult) => {
      if (feedResult.status === 'fulfilled') {
        return items.concat(feedResult.value.items);
      }
      return items;
    }, []);

    res.status(200).json({ items: allFeedItems });
  } catch (error) {
    console.error('Error fetching feed data:', error);
    res.status(500).json({ error: 'Error fetching feed data' });
  }
}
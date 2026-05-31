import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Parser from 'rss-parser';

@Injectable()
export class NewsService {
  private parser = new Parser();

  async getGoogleNews(symbol: string) {
    const url = `https://news.google.com/rss/search?q=${symbol}`;
    const feed = await this.parser.parseURL(url);

    return feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      date: item.pubDate,
    }));
  }

  async getMarketaux() {
    const url = 'https://api.marketaux.com/v1/news/all';
    const key = '';

    const response = await axios.get(url, {
      params: {
        symbols: 'INFY',
        api_token: key,
      },
    });

    return response.data;
  }

  async fetchAllNews(symbol: string) {
    const [google, marketaux] = await Promise.all([
      this.getGoogleNews(symbol),
      this.getMarketaux()
    ]);
    return { google, marketaux };
  }
}

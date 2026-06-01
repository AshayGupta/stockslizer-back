import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Parser from 'rss-parser';

@Injectable()
export class NewsService {
  private parser = new Parser({
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
      "Accept":
        "application/rss+xml, application/xml, text/xml;q=0.9,*/*;q=0.8",
    },
    timeout: 10000,
  });

  async fetchGoogleNews(symbol: string) {
    const url = `https://news.google.com/rss/search?q=${symbol}`;
    
    const feed = await this.parser.parseURL(url);
    console.log('Google News Feed:', feed);

    return feed.items.map((item) => ({
      title: item.title,
      content: item.content,
      link: item.link,
      publishedAt: item.pubDate,
      source: 'Google News',
    }));
  }
  
  async fetchETNews() {
    const url = "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms";
    
    const feed = await this.parser.parseURL(url);
    console.log('ET RSS Feed:', feed);
    
    return feed.items.map((item) => ({
      title: item.title,
      content: item.content,
      link: item.link,
      publishedAt: item.pubDate,
      source: 'Economic Times',
    }));
  }

  // Free tier: 60 API calls/minute for US stock news
  async fetchFinnhubNews(symbol: string) {
    const response = await axios.get('https://finnhub.io/api/v1/company-news',
      {
        params: {
          symbol,
          from: '2026-05-25',
          to: '2026-06-01',
          token: process.env.FINNHUB_KEY,
        },
      },
    );
    console.log('FinnHub News:', response.data);

    return response.data;
  }
  
  async fetchMarketaux() {
    const url = 'https://api.marketaux.com/v1/news/all';

    const response = await axios.get(url, {
      params: {
        symbols: 'INFY',
        api_token: process.env.MARKETAUX_KEY,
      },
    });

    return response.data;
  }

  async fetchAllNews(symbol: string) {
    const [google, et] = await Promise.allSettled([
      this.fetchGoogleNews(symbol),
      this.fetchETNews()
    ]);
    return { google, et };
  }
}

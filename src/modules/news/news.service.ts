import { Injectable } from "@nestjs/common";
import Parser from "rss-parser";

@Injectable()
export class NewsService {

  private parser = new Parser();

  async getGoogleNews(symbol: string) {
    const url = `https://news.google.com/rss/search?q=${symbol}`;
    const feed = await this.parser.parseURL(url);

    return feed.items.map(item => ({
      title: item.title,
      link: item.link,
      date: item.pubDate,
    }));
  }
}
import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { cache } from '../cache/cache.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/all')
  async getNews(
    @Query('symbol')
    symbol: string,
  ) {
    try {
      if (!symbol) {
        throw new Error('Symbol query parameter is required');
      }

      const key = `news:${symbol}`;
      const cached = cache.get(key);
      if (cached) {
        return cached;
      }

      const news = await this.newsService.getAllNews(symbol);
      cache.set(key, news);

      return news;
    } catch (error) {
      throw new Error('Failed to fetch news', { cause: error });
    }
  }
}

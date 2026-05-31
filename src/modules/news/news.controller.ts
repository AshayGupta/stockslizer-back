import { Controller, Get, Query } from '@nestjs/common';
import { getOrSetCache } from '../cache/cache.service';
import { NewsService } from './news.service';

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

      // return this.newsService.getETRss();
      return getOrSetCache(`news:${symbol}`, () => this.newsService.fetchAllNews(symbol));
    } catch (error) {
      throw new Error('Failed to fetch news', { cause: error });
    }
  }
}

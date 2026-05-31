import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getNews(
    @Query('symbol')
    symbol: string,
  ) {
    try {
      if (!symbol) {
        throw new Error('Symbol query parameter is required');
      }
      return this.newsService.getGoogleNews(symbol);
    } catch (error) {
      throw new Error('Failed to fetch news', { cause: error });
    }
  }
}

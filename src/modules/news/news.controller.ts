import { Controller, Get, Query } from '@nestjs/common';
import { validateSymbol } from 'src/common/utils';
import { getOrSetCache } from '../../common/cache/cache.service';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/all')
  async getAllNews(
    @Query('symbol')
    symbol: string,
  ) {
    try {
      validateSymbol(symbol);

      return getOrSetCache(`allNews:${symbol}`, () => this.newsService.fetchAllNews(symbol));
    } catch (error) {
      throw new Error('Failed to fetch all news', { cause: error });
    }
  }

  @Get('/googleNews')
  async getGoogleNews(
    @Query('symbol')
    symbol: string,
  ) {
    try {
      validateSymbol(symbol);

      return getOrSetCache(`googleNews:${symbol}`, () => this.newsService.fetchGoogleNews(symbol));
    } catch (error) {
      throw new Error('Failed to fetch google news', { cause: error });
    }
  }

  @Get('/etNews')
  async getEtNews() {
    try {
      return getOrSetCache('etNews', () => this.newsService.fetchETNews());
    } catch (error) {
      throw new Error('Failed to fetch ET news', { cause: error });
    }
  }

  @Get('/finnhubNews')
  async getFinnhubNews(
    @Query('symbol')
    symbol: string,
  ) {
    try {
      validateSymbol(symbol);

      return getOrSetCache(`finnhubNews:${symbol}`, () => this.newsService.fetchFinnhubNews(symbol));
    } catch (error) {
      throw new Error('Failed to fetch FinnHub news', { cause: error });
    }
  }

  @Get('/marketauxNews')
  async getMarketauxNews() {
    try {
      return getOrSetCache('marketauxNews', () => this.newsService.fetchMarketaux());
    } catch (error) {
      throw new Error('Failed to fetch Marketaux news', { cause: error });
    }
  }
}

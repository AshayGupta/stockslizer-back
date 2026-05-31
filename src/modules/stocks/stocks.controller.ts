import { Controller, Get, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { cache } from '../cache/cache.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}

  @Get('quote')
  async quote(
    @Query('symbol')
    symbol: string,
  ) {
    try {
      if (!symbol) {
        throw new Error('Symbol query parameter is required');
      }

      const key = `stocks:${symbol}`;
      const cached = cache.get(key);
      if (cached) {
        return cached;
      }

      const quote = await this.stockService.quote(symbol);
      cache.set(key, quote);
      
      return quote;
    } catch (error) {
      throw new Error('Failed to fetch stock quote', { cause: error });
    }
  }
}

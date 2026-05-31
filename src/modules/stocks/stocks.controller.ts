import { Controller, Get, Query } from '@nestjs/common';
import { getOrSetCache } from '../cache/cache.service';
import { StocksService } from './stocks.service';

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

      return getOrSetCache(`stocks:${symbol}`, () => this.stockService.quote(symbol));
    } catch (error) {
      throw new Error('Failed to fetch stock quote', { cause: error });
    }
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { getOrSetCache } from '../../common/services/cache/cache.service';
import { StocksService } from './stocks.service';
import { StocksSyncService } from './stocksSync.service';

@Controller('stocks')
export class StocksController {
  constructor(
    private readonly stockService: StocksService, 
    private readonly stocksSyncService: StocksSyncService, 
  ) {}

  @Get('quote')
  async quote(
    @Query('symbol')
    symbol: string,
  ) {
    try {
      if (!symbol) {
        throw new Error('Symbol query parameter is required');
      }

      return getOrSetCache(`stocks:${symbol}`, () => this.stockService.fetchQuote(symbol));
    } catch (error) {
      throw new Error('Failed to fetch stock quote', { cause: error });
    }
  }

  @Get('all')
  async getAllStocks() {
    try {
      const ttl = 60 * 60 * 24 * 2; // 2 days = 172800 seconds
      
      return getOrSetCache(`stocks:master`, () => this.stocksSyncService.syncAll(), ttl);
    } catch (error) {
      throw new Error('Failed to fetch all stock', { cause: error });
    }
  }
}

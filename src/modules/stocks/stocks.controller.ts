import { Controller, Get, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}

  @Get('quote')
  quote(
    @Query('symbol')
    symbol: string,
  ) {
    try {
      if (!symbol) {
        throw new Error('Symbol query parameter is required');
      }
      return this.stockService.quote(symbol);
    } catch (error) {
      throw new Error('Failed to fetch stock quote', { cause: error });
    }
  }
}

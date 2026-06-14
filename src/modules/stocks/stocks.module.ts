import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { StocksSyncService } from './stocksSync.service';

@Module({
  providers: [StocksService, StocksSyncService],
  controllers: [StocksController]
})
export class StocksModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './modules/news/news.module';
import { StocksModule } from './modules/stocks/stocks.module';

@Module({
  imports: [NewsModule, StocksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

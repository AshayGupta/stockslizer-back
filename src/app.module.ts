import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorporateActionsModule } from './modules/corporate-actions/corporate-actions.module';
import { NewsModule } from './modules/news/news.module';
import { StocksModule } from './modules/stocks/stocks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NewsModule,
    StocksModule,
    CorporateActionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

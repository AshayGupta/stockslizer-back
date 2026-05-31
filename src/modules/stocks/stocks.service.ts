import { Injectable } from '@nestjs/common';
import YahooFinance from 'yahoo-finance2';

@Injectable()
export class StocksService {
  private readonly yf = new YahooFinance();

  async quote(symbol: string) {
    return this.yf.quote(`${symbol}.NS`);
  }
}

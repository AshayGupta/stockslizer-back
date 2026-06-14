import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import csv from 'csv-parser';
import { setCache } from 'src/common/services/cache/cache.service';
import { StockInfo } from './interface/stock-info.interface';

@Injectable()
export class StocksSyncService {
  private logger = new Logger('StocksSync');
  private commonHeader = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
  };

  constructor() {}

  // Runs daily at 6 AM
  @Cron('0 6 * * *', {
    timeZone: 'Asia/Kolkata',
  })
  async syncAll() {
    this.logger.log('Starting NSE + BSE sync...');

    const [nseStocks] = await Promise.all([
      this.syncNSE(),
    ]);

    // const seenIsin = new Set<string>();

    // const allStocks = [...nseStocks, ...bseStocks].filter((stock: StockInfo) => {
    //   if (!seenIsin.has(stock.isin)) {
    //     seenIsin.add(stock.isin);
    //     return true;
    //   }
    //   return false;
    // });

    nseStocks.sort((a, b) => {
      if (a.symbol < b.symbol) return -1;
      if (a.symbol > b.symbol) return 1;
      return 0;
    });

    this.logger.log(`Sync completed. Total stocks: ${nseStocks.length}`);

    const ttl = 60 * 60 * 24 * 2;   // 2 days = 172800 seconds
    await setCache('stocks:master', nseStocks, ttl);

    return nseStocks;
  }

  async syncNSE() {
    const url = 'https://archives.nseindia.com/content/equities/EQUITY_L.csv';
    // const url = 'https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv';

    const res = await axios.get(url, { responseType: 'stream' });
    return this.parseCSV(res.data, 'NSE');
  }

  async syncBSE() {
    const url = 'https://www.bseindia.com/download/BhavCopy/Equity/EQ_ISINCODE.csv';

    const res = await axios.get(url, { responseType: 'stream' });
    return this.parseCSV(res.data, 'BSE');
  }

  async parseCSV(stream: any, exchange: string): Promise<StockInfo[]> {
    return new Promise((resolve, reject) => {
      const stocks: StockInfo[] = [];

      stream
        .pipe(csv({mapHeaders: ({ header }) => header.trim()}))
        .on('data', (row) => {
          try {
            this.logger.log('Stock master row keys:', Object.keys(row));
            const stock = this.normalizeRow(row, exchange) as StockInfo;

            if (stock) {
              stocks.push(stock);
            }
          } catch (err) {
            this.logger.error(err);
          }
        })
        .on('end', () => {
          resolve(stocks);
        })
        .on('error', reject);
    });
  }

  normalizeRow(row: any, exchange: string): Partial<StockInfo> | null {
    if (exchange === 'NSE') {
      return {
        symbol: row['SYMBOL'],
        companyName: row['NAME OF COMPANY'],
        isin: row['ISIN NUMBER'],
        dateOfListing: row['DATE OF LISTING'],
        paidUpValue: row['PAID UP VALUE'],
        faceValue: row['FACE VALUE'],
        series: row['SERIES'],
        active: row['SERIES'] === 'EQ',
        exchange,
      };
    }

    if (exchange === 'BSE') {
      return {
        symbol: row['Security Id'],
        companyName: row['Security Name'],
        exchange,
        isin: row['ISIN No'],
        active: true,
      };
    }

    return null;
  }
}

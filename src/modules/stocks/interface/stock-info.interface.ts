export interface StockInfo {
  symbol: string;
  companyName: string;
  isin: string;
  dateOfListing: string;
  paidUpValue: string;
  faceValue: string;
  exchange: string;
  series?: string;
  active: boolean;
}
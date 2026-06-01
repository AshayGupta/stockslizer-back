export interface CorporateAction {
  symbol: string;
  companyName: string;
  eventType:
    | 'DIVIDEND'
    | 'BONUS'
    | 'SPLIT'
    | 'BUYBACK'
    | 'RIGHTS'
    | 'OFS'
    | 'BOARD_MEETING'
    | 'RESULT';

  exDate?: string;
  recordDate?: string;
  meetingDate?: string;
  description?: string;
  source: 'NSE' | 'BSE';
}
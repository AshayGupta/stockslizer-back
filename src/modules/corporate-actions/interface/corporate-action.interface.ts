export enum CorporateActionType {
  DIVIDEND = 'DIVIDEND',
  BONUS = 'BONUS',
  SPLIT = 'SPLIT',
  BUYBACK = 'BUYBACK',
  RIGHTS = 'RIGHTS',
  OFS = 'OFS',
  BOARD_MEETING = 'BOARD_MEETING',
  RESULT = 'RESULT',
  ACQUISITION = 'ACQUISITION',
}

export interface CorporateAction {
  id: string;
  symbol: string;
  companyName: string;
  eventType: CorporateActionType;
  announcementDate?: string;
  recordDate?: string;
  meetingDate?: string;
  description?: string;
  details?: string;
  source: 'NSE' | 'BSE';
}
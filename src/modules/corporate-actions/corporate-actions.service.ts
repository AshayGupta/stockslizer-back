import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CorporateActionsService {
  private apiClient = axios.create({
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'application/json',
      Referer: 'https://www.nseindia.com/',
    },
    timeout: 10000,
  });

  async fetchBoardMeetings(symbol: string, noOfRecords: number = 5) {
    const boardMeetingUrl =
      `https://www.nseindia.com/api/NextApi/apiClient/GetQuoteApi?functionName=getCorpBoardMeeting&symbol=${symbol}&marketApiType=equities&type=W&noOfRecords=${noOfRecords}`;

    const boardMeetingResponse = await this.apiClient.get(boardMeetingUrl);

    console.log('Board Meeting Response:', boardMeetingResponse.data);
  }

  async fetchAnnouncements(symbol: string, noOfRecords: number = 5) {
    const announcementsUrl =
      `https://www.nseindia.com/api/NextApi/apiClient/GetQuoteApi?functionName=getCorporateAnnouncement&symbol=${symbol}&marketApiType=equities&noOfRecords=${noOfRecords}`;

    const announcementsResponse = await this.apiClient.get(announcementsUrl);

    console.log('Announcements Response:', announcementsResponse.data);
  }

  async fetchCorpActions(symbol: string, noOfRecords: number = 5) {
    const corpActionUrl =
      `https://www.nseindia.com/api/NextApi/apiClient/GetQuoteApi?functionName=getCorpAction&symbol=${symbol}&marketApiType=equities&noOfRecords=${noOfRecords}`;

    const corpActionResponse = await this.apiClient.get(corpActionUrl);

    console.log('Corp Actions Response:', corpActionResponse.data);
  }

  async fetchCorpEventCalendar(symbol: string, noOfRecords: number = 5) {
    const corpEventCalendarUrl =
      `https://www.nseindia.com/api/NextApi/apiClient/GetQuoteApi?functionName=getCorpEventCalender&symbol=${symbol}&noOfRecords=${noOfRecords}&marketApiType=equities`;
    const corpEventCalendarResponse =
      await this.apiClient.get(corpEventCalendarUrl);

    console.log('Corp Event Calendar Response:', corpEventCalendarResponse.data);
  }

  async fetchShareholdingPattern(symbol: string, noOfRecords: number = 5) {
    const shareholdingPatternUrl =
      `https://www.nseindia.com/api/NextApi/apiClient/GetQuoteApi?functionName=getShareholdingPattern&symbol=${symbol}&noOfRecords=${noOfRecords}`;

    const shareholdingPatternResponse = await this.apiClient.get(shareholdingPatternUrl);

    console.log('Shareholding Pattern Response:', shareholdingPatternResponse.data);
  }
  
}

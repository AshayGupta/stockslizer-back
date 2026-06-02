import { Controller, Get, Query } from '@nestjs/common';
import { CorporateActionsService } from './corporate-actions.service';

@Controller('corporate-actions')
export class CorporateActionsController {
  constructor(
    private readonly corporateActionsService: CorporateActionsService,
  ) {}

  @Get('/board-meetings')
  async getBoardMeetings(
    @Query('symbol') symbol: string,
    @Query('noOfRecords') noOfRecords?: number,
  ) {
    try {
      return await this.corporateActionsService.fetchBoardMeetings(symbol, noOfRecords);
    } catch (error) {
      throw new Error('Failed to fetch board meetings', { cause: error });
    }
  }

  @Get('/announcements')
  async getAnnouncements(
    @Query('symbol') symbol: string,
    @Query('noOfRecords') noOfRecords?: number,
  ) {
    try {
      return await this.corporateActionsService.fetchAnnouncements(symbol, noOfRecords);
    } catch (error) {
      throw new Error('Failed to fetch announcements', { cause: error });
    }
  }

  @Get('/corp-actions')
  async getCorpActions(
    @Query('symbol') symbol: string,
    @Query('noOfRecords') noOfRecords?: number,
  ) {
    try {
      return await this.corporateActionsService.fetchCorpActions(symbol, noOfRecords);
    } catch (error) {
      throw new Error('Failed to fetch corp actions', { cause: error });
    }
  }

  @Get('/corp-event-calendar')
  async getCorpEventCalendar(
    @Query('symbol') symbol: string,
    @Query('noOfRecords') noOfRecords?: number,
  ) {
    try {
      return await this.corporateActionsService.fetchCorpEventCalendar(symbol, noOfRecords);
    } catch (error) {
      throw new Error('Failed to fetch corp event calendar', { cause: error });
    }
  }

  @Get('/shareholding-pattern')
  async getShareholdingPattern(
    @Query('symbol') symbol: string,
    @Query('noOfRecords') noOfRecords?: number,
  ) {
    try {
      return await this.corporateActionsService.fetchShareholdingPattern(symbol,noOfRecords);
    } catch (error) {
      throw new Error('Failed to fetch shareholding pattern', { cause: error });
    }
  }
}

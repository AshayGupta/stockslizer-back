import { Module } from '@nestjs/common';
import { CorporateActionsService } from './corporate-actions.service';
import { CorporateActionsController } from './corporate-actions.controller';

@Module({
  providers: [CorporateActionsService],
  controllers: [CorporateActionsController]
})
export class CorporateActionsModule {}

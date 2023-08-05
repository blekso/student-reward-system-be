import { Module } from '@nestjs/common';
import { ClaimService } from './services/claim.service';
import { ClaimController } from './controllers/claim.controller';

@Module({
  providers: [ClaimService],
  controllers: [ClaimController],
})
export class ClaimModule {}

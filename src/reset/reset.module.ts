import { Module } from '@nestjs/common';
import { ResetController } from './controllers/reset.controller';
import { ResetService } from './services/reset.service';
import { ClaimService } from 'src/claim/services/claim.service';

@Module({
  controllers: [ResetController],
  providers: [ResetService, ClaimService],
})
export class ResetModule {}

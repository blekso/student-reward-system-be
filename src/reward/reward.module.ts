import { Module } from '@nestjs/common';
import { RewardController } from './controllers/reward.controller';
import { RewardService } from './services/reward.service';
import { UserService } from 'src/user/services/user.service';

@Module({
  controllers: [RewardController],
  providers: [RewardService, UserService],
})
export class RewardModule {}

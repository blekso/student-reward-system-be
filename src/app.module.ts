import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ClaimModule } from './claim/claim.module';
import { RewardModule } from './reward/reward.module';
import { ResetModule } from './reset/reset.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    ClaimModule,
    RewardModule,
    ResetModule,
  ],
})
export class AppModule {}

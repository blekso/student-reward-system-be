import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthService, UserService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}

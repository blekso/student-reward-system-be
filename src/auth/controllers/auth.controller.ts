import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { HandleRedirectDto } from '../dto/handle-redirect.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/handle-redirect')
  async handleRedirect(
    @Query() dto: HandleRedirectDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(dto.jwt);
    response.cookie('accessToken', dto.jwt);
  }
}

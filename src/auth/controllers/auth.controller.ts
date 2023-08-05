import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { HandleRedirectDto } from '../dto/handle-redirect.dto';
import { ResponseError } from 'src/common/dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/handle-redirect')
  @Redirect('http://localhost:3000/items', 302)
  async handleRedirect(
    @Query() dto: HandleRedirectDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(dto.jwt);
    if (dto.jwt) {
      try {
        const { token } = await this.authService.handleRedirect(dto);

        console.log(token);
        response.cookie('accessToken', token.access_token);
      } catch (err) {
        return new ResponseError('AUTH.REDIRECT', err);
      }
    }
  }
}

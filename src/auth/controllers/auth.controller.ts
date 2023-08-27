import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { HandleRedirectDto } from '../dto/handle-redirect.dto';
import { ResponseError } from 'src/common/dto/response.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/handle-redirect')
  @ApiOperation({
    tags: [`Auth`],
    summary: 'Handle redirect',
  })
  @Redirect(`${process.env.APP_URL}/items`, 302)
  async handleRedirect(
    @Query() dto: HandleRedirectDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (dto.jwt) {
      try {
        const { token } = await this.authService.handleRedirect(dto);

        response.cookie('accessToken', token.access_token);
      } catch (err) {
        return new ResponseError('AUTH.REDIRECT', err);
      }
    }
  }
}

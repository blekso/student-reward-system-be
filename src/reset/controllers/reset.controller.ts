import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseError } from 'src/common/dto/response.dto';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { ClaimService } from 'src/claim/services/claim.service';

@Controller('reset')
export class ResetController {
  constructor(private claimService: ClaimService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    tags: [`Reset`],
    summary: 'Demo Reset',
  })
  @ApiResponse({
    status: 200,
    description: 'Reset response.',
    type: String,
  })
  @ApiResponse({
    status: 404,
    description: 'Empty response.',
    type: null,
  })
  async reset(
    @Req() request: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      await this.claimService.delete(request.user.aai);
      return 'OK';
    } catch (error) {
      if (error.status) response.status(error.status);
      else response.status(500);
      return new ResponseError('RESET', error);
    }
  }
}

import { Body, Controller, Post, Res } from '@nestjs/common';
import { ClaimService } from '../services/claim.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseError } from 'src/common/dto/response.dto';
import { Response } from 'express';
import { ClaimResponse, CreateClaimDto } from '../dto';

@Controller('claim')
export class ClaimController {
  constructor(private claimService: ClaimService) {}

  @Post()
  //@UseGuards(JwtGuard)
  //@ApiBearerAuth('JWT-auth')
  @ApiOperation({
    tags: [`Claim`],
    summary: 'Post a new claim',
  })
  @ApiBody({ type: CreateClaimDto })
  @ApiResponse({
    status: 200,
    description: 'A Claim.',
    type: ClaimResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Empty response.',
    type: null,
  })
  async create(
    @Body() dto: CreateClaimDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      return await this.claimService.create(dto);
    } catch (error) {
      if (error.status) response.status(error.status);
      else response.status(500);
      return new ResponseError('CLAIM.CREATE', error);
    }
  }
}

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { RewardService } from '../services/reward.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseError } from 'src/common/dto/response.dto';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from 'src/user/services/user.service';

@Controller('reward')
export class RewardController {
  constructor(
    private rewardService: RewardService,
    private userService: UserService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    tags: [`Reward`],
    summary: 'Get user rewards',
  })
  @ApiResponse({
    status: 200,
    description: 'User rewards.',
    //type: [RewardResponse],
  })
  @ApiResponse({
    status: 404,
    description: 'Empty response.',
    type: null,
  })
  async getUserRewards(
    @Req() request: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const user = await this.userService.getCurrent(request.user.aai);
      return await this.rewardService.getUserRewards(user);
    } catch (error) {
      if (error.status) response.status(error.status);
      else response.status(500);
      return new ResponseError('REWARD.GET_USER_REWARDS', error);
    }
  }
}

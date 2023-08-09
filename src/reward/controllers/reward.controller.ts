import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { RewardService } from '../services/reward.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseError } from 'src/common/dto/response.dto';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from 'src/user/services/user.service';
import { RewardResponse } from '../dto';

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
    type: [RewardResponse],
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

  @Get('metadata/:id')
  @ApiOperation({
    tags: [`Reward`],
    summary: 'Get Reward Metadata',
  })
  async getRewardMetadata() {
    return await this.rewardService.getRewardMetadata();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    tags: [`Reward`],
    summary: 'Get reward by id.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of the reward that exists in the database',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'a reward.',
    type: RewardResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Empty response.',
    type: null,
  })
  async getById(
    @Param('id') id: string,
    @Req() request: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const user = await this.userService.getCurrent(request.user.aai);
      return await this.rewardService.getById(id, user);
    } catch (error) {
      if (error.status) response.status(error.status);
      else response.status(500);
      return new ResponseError('REWARD.GET_BY_ID', error);
    }
  }
}

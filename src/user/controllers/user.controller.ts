import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ResponseError } from 'src/common/dto/response.dto';
import { UserService } from '../services/user.service';
import { JwtGuard } from 'src/auth/guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UserResponse } from '../dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':aai')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    tags: [`User`],
    summary: 'Get User by aai',
  })
  @ApiParam({
    name: 'aai',
    required: true,
    description: 'Should be an aai of a User that exists in the database',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'A User.',
    type: UserResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Empty response.',
    type: null,
  })
  async getCurrent(
    @Param('aai') aai: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      return await this.userService.getCurrent(aai);
    } catch (error) {
      if (error.status) response.status(error.status);
      else response.status(500);
      return new ResponseError('USER.GET_CURRENT', error);
    }
  }
}

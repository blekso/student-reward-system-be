import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto';
import { UserService } from 'src/user/services/user.service';
import { HandleRedirectDto } from '../dto/handle-redirect.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: HandleRedirectDto) {
    const decodedUserDto = this.jwtService.decode(dto.jwt);

    const user = await this.userService.getByAai('test');
    //await this.userService.getByAai(decodedUserDto.aai);

    if (!user) {
      await this.userService.create(decodedUserDto as UserDto);
    }
  }
}

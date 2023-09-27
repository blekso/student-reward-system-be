import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto';
import { UserService } from 'src/user/services/user.service';
import { HandleRedirectDto } from '../dto/handle-redirect.dto';
import { DecodedUser } from '../types';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  async handleRedirect(dto: HandleRedirectDto) {
    const decodedUserDto = this.jwt.decode(dto.jwt) as DecodedUser;

    let user = await this.userService.getByAai(decodedUserDto.aai);

    if (!user) {
      user = await this.userService.create(decodedUserDto as UserDto);
    }

    const token = await this.signToken(user.aai, user.email);

    return {
      user,
      token,
    };
  }

  async signToken(aai: string, email: string) {
    const payload = {
      aai,
      email,
    };

    const token = await this.jwt.signAsync(payload);

    return {
      access_token: token,
    };
  }
}

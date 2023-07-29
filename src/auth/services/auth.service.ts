import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: any) {
    const decodedUserDto: any = this.jwtService.decode(dto.jwt);

    const user = await this.userService.getByAai(decodedUserDto.aai);

    if (!user) {
      await this.userService.create(decodedUserDto);
    }
  }
}

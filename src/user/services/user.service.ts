import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from '../dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getByAai(aai: string) {
    return await this.prisma.user.findUnique({
      where: {
        aai,
      },
    });
  }

  async getCurrent(aai: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        aai,
      },
      include: {
        statistics: true,
        claims: {
          include: {
            reward: true,
          },
        },
      },
    });

    if (!user) throw new HttpException('USER.NOT_FOUND', HttpStatus.NOT_FOUND);
    return user;
  }

  async create(dto: UserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          aai: dto.aai,
          firstName: dto.ime,
          lastName: dto.prezime,
          title: dto.titula,
          email: dto.email,
          authority: dto.ovlasti,
          iat: dto.iat,
          exp: dto.exp,
          statistics: {
            create: {
              solvedCourses: Math.floor(Math.random() * 8) + 1,
              gpa: parseFloat((Math.random() * 4 + 1).toFixed(2)),
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

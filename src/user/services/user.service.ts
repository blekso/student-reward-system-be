import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getByAai(aai: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        aai,
      },
    });

    if (!user) throw new HttpException('USER.NOT_FOUND', HttpStatus.NOT_FOUND);
    return user;
  }

  async getCurrent(aai: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        aai,
      },
      include: {
        statistics: true,
      },
    });

    if (!user) throw new HttpException('USER.NOT_FOUND', HttpStatus.NOT_FOUND);
    return user;
  }

  async create(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          ...dto,
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

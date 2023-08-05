import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RewardService {
  constructor(private prisma: PrismaService) {}

  async getUserRewards(user: any) {
    const userClaimsIds = user.claims.map((el) => {
      return el.id;
    });

    return await this.prisma.reward.findMany({
      where: {
        id: {
          notIn: userClaimsIds,
        },
        claimCondition: {
          gpa: {
            gte: user.statistics.gpa,
          },
          solvedCourses: {
            gte: user.statistics.solvedCourses,
          },
        },
      },
    });
  }
}

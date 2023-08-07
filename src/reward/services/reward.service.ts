import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs-extra';

@Injectable()
export class RewardService {
  constructor(private prisma: PrismaService) {}
  private readonly metadataFilePath = 'data/metadata.json';

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
            lte: user.statistics.gpa,
          },
          solvedCourses: {
            lte: user.statistics.solvedCourses,
          },
        },
      },
    });
  }

  async getMetadata() {
    return await fs.readJson(this.metadataFilePath);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs-extra';

@Injectable()
export class RewardService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string, user: any) {
    const reward: any = await this.prisma.reward.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const claimedReward = user.claims.find((el) => el.rewardId == reward.id);

    if (claimedReward) {
      reward.claimed = true;
      reward.txHash = claimedReward.txHash;
    }
    if (!reward)
      throw new HttpException('REWARD.NOT_FOUND', HttpStatus.NOT_FOUND);
    return reward;
  }

  async getUserRewards(user: any) {
    const userClaimsIds = user.claims.map((el) => {
      return el.rewardId;
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

  async getRewardMetadata(name: string) {
    return await fs.readJson(`data/metadata_${name}.json`);
  }
}

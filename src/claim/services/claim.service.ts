import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClaimDto } from '../dto';

@Injectable()
export class ClaimService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClaimDto) {
    try {
      return await this.prisma.claim.create({
        data: dto,
      });
    } catch (error) {
      throw error;
    }
  }
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClaimDto {
  /**
   * User aai
   */
  @IsNotEmpty()
  @IsString()
  userAai: string;

  /**
   * Token Id
   */
  @IsNumber()
  tokenId: number;

  /**
   * Reward Id
   */
  @IsNumber()
  rewardId: number;
}

export class ClaimResponse extends CreateClaimDto {
  /**
   * User id in database
   * @example 1
   */
  @IsString()
  id: number;
}

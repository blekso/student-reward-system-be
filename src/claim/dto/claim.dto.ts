import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClaimDto {
  /**
   * User aai
   */
  @IsNotEmpty()
  @IsString()
  userAai: string;

  /**
   * Transaction hash
   */
  @IsNotEmpty()
  @IsString()
  txHash: string;

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

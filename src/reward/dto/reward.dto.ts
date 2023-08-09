import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRewardDto {
  /**
   * Reward name
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Reward short description
   */
  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  /**
   * Reward description
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * Reward contract address
   */
  @IsNotEmpty()
  @IsString()
  contractAddress: string;

  /**
   * Reward image url
   */
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  /**
   * Reward type
   */
  @IsNotEmpty()
  @IsString()
  type: string;
}

export class RewardResponse extends CreateRewardDto {
  /**
   * Reward id in database
   * @example 1
   */
  @IsString()
  id: number;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class HandleRedirectDto {
  @IsNotEmpty()
  @IsString()
  jwt: string;
}

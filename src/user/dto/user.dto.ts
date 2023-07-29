import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  aai?: string;

  @IsNotEmpty()
  @IsString()
  ime: string;

  @IsNotEmpty()
  @IsString()
  prezime: string;

  @IsOptional()
  @IsString()
  titula?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}

export class UserResponse extends UserDto {}

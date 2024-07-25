import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class userDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  dni: string;

  @IsOptional()
  @IsNumber()
  @MinLength(6)
  @MaxLength(15)
  phone?: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

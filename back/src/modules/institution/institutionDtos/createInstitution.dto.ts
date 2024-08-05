import { ApiHideProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateInstitutionDto {
  /**
   * Debe ser un string de entre 3 y 80 caracteres
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  /**
   * Debe ser un email de entre 13 y 30 caracteres
   */
  @IsNotEmpty()
  @IsEmail()
  @Length(13, 30)
  email: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  accountNumber: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;

  /**
   * Debe ser un número entre 3 y 80 caracteres
   */
  @Length(3, 15)
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, {
    message: 'El número de teléfono solo puede contener dígitos',
  })
  phone: string;
  /**
   * Imágen de enre 3 y 130 caracteres
   */
  @IsString()
  @IsOptional()
  // @Length(3, 130)
  logo?: string;

  /**
   * Imágen entre 3 y 130 caracteres
   */
  @IsString()
  @IsOptional()
  // @Length(3, 130)
  banner?: string;

  @ApiHideProperty()
  @IsEmpty()
  role?: string;
}

export class EmailInstitutionDto extends PickType(CreateInstitutionDto, [
  'email',
]) {}

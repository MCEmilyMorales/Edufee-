import { ApiHideProperty, PickType } from '@nestjs/swagger';
import {
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
   * debe ser un email
   */
  @IsNotEmpty()
  @IsString()
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

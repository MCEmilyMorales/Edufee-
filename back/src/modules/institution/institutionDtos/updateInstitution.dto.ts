import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Role } from 'src/enums/enums';

export class UpdateInstitutionDto {
  /**
   * Debe ser un string de entre 3 y 80 caracteres
   */
  @IsOptional()
  @IsString()
  @Length(3, 80)
  name: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   */
  @IsOptional()
  @IsString()
  @Length(3, 80)
  accountNumber: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   */
  @IsOptional()
  @IsString()
  @Length(3, 80)
  address: string;

  /**
   * Debe ser un número entre 3 y 80 caracteres
   */
  @Length(3, 15)
  @IsString()
  @IsOptional()
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

  @IsOptional()
  @ApiHideProperty()
  @IsEmpty()
  role?: Role;

  @IsOptional()
  @ApiHideProperty()
  isActive: boolean;
}

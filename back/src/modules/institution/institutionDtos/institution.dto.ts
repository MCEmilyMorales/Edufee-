import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class InstitutionDto {
  /**
   * Debe ser un string de entre 3 y 80 caracteres
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

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
  adress: string;

  /**
   * Debe ser un número entre 3 y 80 caracteres
   */
  @IsNotEmpty()
  @IsNumber()
  @Length(3, 50)
  phone: number;

  /**
   * Imágen de enre 3 y 130 caracteres
   */
  @IsString()
  @Length(3, 130)
  logo?: string;

  /**
   * Imágen entre 3 y 130 caracteres
   */
  @IsString()
  @Length(3, 130)
  banner?: string;
}

import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class updateUserDto {
  /**
   * Debe ser un string de entre 3 y 50 caracteres
   */
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name: string;

  /**
   * Debe ser un string entre 3 y 50 caracteres
   */
  @IsOptional()
  @IsString()
  @Length(3, 50)
  lastname: string;

  /**
   * Debe ser un email
   * @example: email@email.com
   */
  @IsEmail()
  @IsOptional()
  email: string;

  /**
   * Debe ser un string hasta máximo 8 caracteres
   */
  @IsString()
  @Length(7, 8)
  @IsOptional()
  dni?: string;

  /**
   * url de la imágen subida a cloudinary
   */
  @IsString()
  @IsOptional()
  @Length(3, 130)
  imgProfile?: string;
}

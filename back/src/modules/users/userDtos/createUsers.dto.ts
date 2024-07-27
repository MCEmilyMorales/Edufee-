import { IsNotEmpty, IsString, Length } from 'class-validator';

export class createUserDto {
  /**
   * Debe ser un string de entre 3 y 50 caracteres
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  /**
   * Debe ser un string entre 3 y 50 caracteres
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  lastname: string;

  /**
   * Debe ser un string hasta máximo 8 caracteres
   */
  @IsString()
  @Length(7, 8)
  dni?: string;

  /**
   * url de la imágen subida a cloudinary
   */
  @IsString()
  @Length(3, 130)
  imgProfile: string;
}

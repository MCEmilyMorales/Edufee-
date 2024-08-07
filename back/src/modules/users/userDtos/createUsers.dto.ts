import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Role } from 'src/enums/enums';

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
   * Debe ser un email
   * @example: email@email.com
   */
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail()
  email: string;

  /**
   * Debe ser un string hasta máximo 8 caracteres
   */
  @IsString()
  @Length(7, 8)
  @IsNotEmpty({ message: 'El dni es obligatorio' })
  dni: string;

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

  @IsEmpty()
  role?: Role;

  /**
   * url de la imágen subida a cloudinary
   */
  @IsString()
  @IsOptional()
  @Length(3, 130)
  imgProfile?: string;

  @IsNotEmpty()
  @IsString()
  institutionName: string;
}

export class EmailUserDto extends PickType(createUserDto, ['email']) {}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStripeDto {
  @IsNotEmpty({ message: 'El monto no puede estar vacío' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  amount: number;

  @IsString({ message: 'La moneda debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'La moneda no puede estar vacía' })
  currency: string;
}

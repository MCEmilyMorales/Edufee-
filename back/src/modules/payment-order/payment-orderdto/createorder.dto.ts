import { IsUUID, IsNotEmpty, IsEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  /**
   * El monto debe ser un numero
   */
  @IsNotEmpty()
  @IsNumber()
  monto: number;

  /**
   * Estado: por ahora es un string
   */
  @IsEmpty()
  estado: string;

  /**
   * UserId: UUID (aun esta en proceso de analisis)
   */
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  /**
   * AccountNumber: string 
   */
  @IsNotEmpty()
  accountNumber: string; //
}

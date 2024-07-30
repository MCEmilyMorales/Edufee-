import { IsUUID, IsNotEmpty, IsEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @IsEmpty()
  estado: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  accountNumber: string; //
}

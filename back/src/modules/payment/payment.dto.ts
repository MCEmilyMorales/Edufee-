import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class PaymentDto {
  @ApiProperty({
    description: 'URL del PDF en Cloudinary',
  })
  @IsNotEmpty()
  @IsString()
  pdfImage: string;

  @ApiProperty({
    description: 'Monto del pago',
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'ID del usuario que realiza el pago',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'ID de la institución que recibe el pago',
  })
  @IsNotEmpty()
  @IsUUID()
  institutionId: string;
}

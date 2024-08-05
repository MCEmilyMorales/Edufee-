import { Entity } from 'typeorm';

import { IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'payments' })
export class Payment {
  @IsNotEmpty()
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  pdfImage: string;
}

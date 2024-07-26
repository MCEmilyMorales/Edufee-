import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { PaymentOrder } from '../payment-order/paymentOrder.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'payments' })
export class Payment {
  @ApiProperty({
    description: 'UUIDV4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ingresar una fecha con formato dd/mm/yy',
    example: '02/07/2024',
  })
  @Column()
  fecha: Date;

  @OneToOne(() => PaymentOrder, (paymentOrder) => paymentOrder.id)
  paymentOrder_id: PaymentOrder;
}

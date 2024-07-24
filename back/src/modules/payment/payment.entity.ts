import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { PaymentOrder } from '../payment-order/paymentOrder.entity';

@Entity({ name: 'paymentDetails' })
export class PaymentDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fecha: Date;

  @OneToOne(() => PaymentOrder, (paymentOrder) => paymentOrder.id)
  paymentOrder_id: PaymentOrder;
}

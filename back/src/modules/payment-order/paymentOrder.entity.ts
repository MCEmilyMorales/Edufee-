import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity({ name: 'paymentOrders' })
export class PaymentOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  monto: number;

  @Column({ default: 'pending' })
  estado: string;

  @OneToOne(() => User)
  user_id: User;
}

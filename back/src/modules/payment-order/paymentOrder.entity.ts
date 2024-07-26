import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'paymentOrders' })
export class PaymentOrder {
  @ApiProperty({
    description: 'UUIDV4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 59.9,
  })
  @Column({ type: 'decimal' })
  monto: number;

  @ApiProperty({
    description: 'Estado de la orden de pago',
    example: 'Pendiente / Completado',
  })
  @Column({ default: 'Pendiente' })
  estado: string;

  @OneToOne(() => User)
  user_id: User;
}

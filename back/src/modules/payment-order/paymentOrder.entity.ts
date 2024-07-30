import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Institution } from '../institution/institution.entity';

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

  @ManyToOne(() => User, (user) => user.paymentOrder)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Institution, (institution) => institution.paymentOrders)
  @JoinColumn({ name: 'institution_id' }) // Asegúrate de tener el nombre de la columna correcto
  institution: Institution;
}

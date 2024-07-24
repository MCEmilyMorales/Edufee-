import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'paymentOrders' })
export class PaymentOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;
}

// una vez que hablemos con el profesor vamos a crear las relaciones
//estudiantes id

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'paymentDetails' })
export class PaymentDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;
}

// orden de pago Id falta charla con el profesor
// instituto id Id falta charla con el profesor

// una vez que hablemos con el profesor vamos a crear las relaciones

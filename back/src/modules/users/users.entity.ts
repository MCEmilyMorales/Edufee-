import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Institution } from '../institution/institution.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentOrder } from '../payment-order/paymentOrder.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    description: 'UUIDV4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Máximo 50 caracteres',
    example: 'Juan',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @ApiProperty({
    description: 'Máximo 50 caracteres',
    example: 'García',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  lastname: string;

  @ApiProperty({
    description: 'Email',
    example: 'email@email.com',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: 'DNI del usuario',
    example: 12345678,
  })
  @Column({
    type: 'varchar',
    length: 8,
    nullable: true,
  })
  dni?: string;

  @ApiProperty({
    description: 'URL de cloudinary',
  })
  @Column({
    type: 'varchar',
    length: 130,
    nullable: true,
  })
  imgProfile?: string;

  @ApiProperty({
    description: 'role de usuario',
  })
  @Column({ type: 'varchar', length: 50, default: 'student' })
  role: string;

  @ManyToOne(() => Institution, (institution) => institution.user_id)
  institution: Institution;

  @OneToMany(() => PaymentOrder, (paymentOrder) => paymentOrder.user)
  paymentOrder: PaymentOrder;
}

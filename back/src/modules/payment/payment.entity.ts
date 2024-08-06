import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { Institution } from '../institution/institution.entity';

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
  date: string;

  @ApiProperty({
    description: 'URL DEL PDF DE CLOUDINARY',
  })
  @Column()
  pdfImage: string;

  @ApiProperty({
    description: 'Monto del pago',
  })
  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Institution, (institution) => institution.payments)
  institution: Institution;
}

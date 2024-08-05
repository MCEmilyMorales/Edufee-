import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';

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

  @ApiProperty({
    description: 'URL DEL PDF DE CLOUDINARY',
  })
  @Column()
  pdfImage: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}

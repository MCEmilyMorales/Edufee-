import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('institutions')
export class Institution {
  @ApiProperty({
    description: 'uuid V4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Universidad de Palermo',
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    description: 'Número de cuenta / CBU de cuenta',
  })
  @Column({ type: 'varchar', length: 80 })
  accountNumber: string;

  @ApiProperty({
    example: 'Calle falsa 123',
  })
  @Column({ type: 'varchar', length: 80 })
  address: string;

  @ApiProperty({
    example: '123456789',
  })
  @Column({ type: 'int' })
  phone: number;

  @ApiProperty({
    description: 'URL de cloudinary',
  })
  @Column({
    type: 'varchar',
    length: 130,
  })
  logo?: string;

  @ApiProperty({
    description: 'URL de cloudinary',
  })
  @Column({ type: 'varchar', length: 130 })
  banner?: string;

  @OneToMany(() => User, (user) => user.institution)
  user_id: User[];
}

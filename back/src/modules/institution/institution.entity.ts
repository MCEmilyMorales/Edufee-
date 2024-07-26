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
    example: 'Calle falsa 123',
  })
  @Column({ type: 'varchar', length: 50 })
  address: string;

  @ApiProperty({
    example: 'ejemplo@gmail.com',
  })
  @Column({ type: 'varchar', length: 50 })
  email: string;

  @ApiProperty({
    example: '123456789',
  })
  @Column({ type: 'int' })
  phone: number;

  @OneToMany(() => User, (user) => user.institution)
  user_id: User[];
}

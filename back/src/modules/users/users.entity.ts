import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Institution } from '../institution/institution.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 8,
  })
  Dni: string;

  @Column({
    type: 'int',
  })
  phone?: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @ManyToOne(() => Institution, (institution) => institution.user_id)
  institution: Institution;
} //prueba

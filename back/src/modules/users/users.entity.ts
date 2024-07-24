import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({
    type: 'varchar',
    length: 128,
  })
  password: string;
}

//instiucion ID falta harla con el profesor

//carrera ID falta harla con el profesor
// una vez que hablemos con el profesor vamos a crear las relacione

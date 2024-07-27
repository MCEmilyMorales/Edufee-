import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Institution } from '../institution/institution.entity';
import { ApiProperty } from '@nestjs/swagger';

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
    description: 'DNI del usuario',
    example: 12345678,
  })
  @Column({
    type: 'varchar',
    length: 8,
  })
  dni?: string;

  @ApiProperty({
    description: 'URL de cloudinary',
  })
  @Column({
    type: 'varchar',
    length: 130,
  })
  imgProfile: string;

  // @ApiProperty({
  //   example: '2644123456',
  // })
  // @Column({
  //   type: 'int',
  // })
  // phone?: number;

  // @ApiProperty({
  //   description: 'email de tipo único, máximo 50 caractéres',
  //   example: 'ejemplo@gmail.com',
  // })
  // @Column({
  //   type: 'varchar',
  //   length: 50,
  //   unique: true,
  // })
  // email: string;

  @ManyToOne(() => Institution, (institution) => institution.user_id)
  institution: Institution;
}

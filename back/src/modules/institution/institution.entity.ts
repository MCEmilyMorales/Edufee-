import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'; 

@Entity('institutions')
export class Institution{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type:'varchar', length:50})
    name:string

    @Column({type:'varchar', length:50})
    address:string

    @Column({type:'varchar', length:50})
    email:string

    // @Column({type:'varchar', length:50})
    // img?: string

    // @Column({type:'varchar', length:50})
    // student_id?:[]
}
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'; 

@Entity('careers')
export class Career{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type:'varchar', length:50})
    name:string

    @Column({ type: 'decimal', precision: 10, scale: 2})
    price:number

    @Column({type:'int'})
    share: number

    @Column({type:'date'})
    dueDate:Date
}
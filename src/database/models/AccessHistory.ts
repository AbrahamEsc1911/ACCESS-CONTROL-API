import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class AccessHistory extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'user_id'})
    user_id!: number

    @Column({ name: 'room_id'})
    room_id!: number

    @Column({ name: 'entry_date'})
    entry_date!: Date

    @Column({ name: 'exit_date'})
    exit_date!: Date

}

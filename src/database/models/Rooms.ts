import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Rooms extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'room'})
    room!: string

    @Column({ name: 'capacity'})
    capacity!: number

    @Column({ name: 'room_type'})
    room_type!: string
}

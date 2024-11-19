import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./Users"
import { Rooms } from "./Rooms"

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

    @ManyToOne(() => Users, user => user.accessHistory)
    @JoinColumn({ name: 'user_id'})
    user!: Users

    @ManyToOne(() => Rooms, room => room.accessHistory)
    @JoinColumn({ name: 'room_id'})
    room!: Rooms
}

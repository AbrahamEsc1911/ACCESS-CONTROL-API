import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./Users"
import { Rooms } from "./Rooms"

@Entity()
export class Access extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'user_id' })
    name!: number

    @Column({ name: 'room_id' })
    room_id!: number

    @Column({ name: 'entry_date' })
    entry_date!: Date

    @Column({ name: 'exit_date' })
    exit_date!: Date

    @Column({ name: 'state' })
    state!: string

    @ManyToOne(() => Users, user => user.access)
    @JoinColumn({ name: 'user_id' })
    user!: Users

    @ManyToOne(() => Rooms, room => room.access)
    @JoinColumn({ name: 'room_id' })
    room!: Rooms[]

}

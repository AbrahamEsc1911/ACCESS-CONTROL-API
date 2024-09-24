import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Access } from "./Access"
import { AccessHistory } from "./AccessHistory"

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

    @OneToMany(() => Access, access => access.room)
    access!: Access[]

    @OneToMany(() => AccessHistory, accessHistory => accessHistory.room)
    accessHistory!: AccessHistory
}

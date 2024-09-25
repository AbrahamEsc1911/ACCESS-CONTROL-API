import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Access } from "./Access"
import { AccessHistory } from "./AccessHistory"

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'name'})
    name!: string
    
    @Column({ name: 'StartUp'})
    StartUp!: string

    @Column({ name: 'email'})
    email!: string

    @Column({ name: 'password'})
    password!: string

    @Column({ name: 'dni'})
    dni!: string

    @Column({ name: 'phone'})
    phone!: number

    @OneToMany(() => Access, access => access.user)
    access!: Access[]

    @OneToMany(() => AccessHistory, accessHistory => accessHistory.user)
    accessHistory! : AccessHistory
}

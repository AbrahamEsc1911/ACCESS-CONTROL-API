import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'name'})
    name!: string
    
    @Column({ name: 'StartUp'})
    StarUp!: string

    @Column({ name: 'email'})
    email!: string

    @Column({ name: 'password'})
    password!: string

    @Column({ name: 'dni'})
    dni!: string

    @Column({ name: 'phone'})
    phone!: number
}

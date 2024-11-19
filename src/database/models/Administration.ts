import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Administration extends BaseEntity{

    @PrimaryGeneratedColumn()
     id!: number

    @Column({ name: 'report_date'})
    report_date!: Date

    @Column({ name: 'total_access'})
    total_access!: number

    @Column({ name: 'total_absences'})
    total_absences!: number

    @Column({ name: 'frequent_people'})
    frequent_people!: number

    @Column({ name: 'less_frequent_people'})
    less_frequent_people!: number

}

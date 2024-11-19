import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Administration1726684221597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'administration',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'report_date',
                    type: 'datetime',
                    default: 'now()'
                },
                {
                    name: 'total_access',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'total_absences',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'frequent_people',
                    type: 'int',
                    default: 0,
                    isNullable: false
                },
                {
                    name: 'less_frequent_people',
                    type: 'int',
                    default: 0,
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('administration')
    }

}

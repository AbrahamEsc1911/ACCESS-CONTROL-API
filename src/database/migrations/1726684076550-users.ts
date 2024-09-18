import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1726684076550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '80',
                    isNullable: true,
                },
                {
                    name: 'StartUp',
                    type: 'varchar',
                    length: '200',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '200',
                    isNullable: false
                },
                {
                    name: 'DNI',
                    type: 'varchar',
                    length: '9',
                    isNullable: false,
                },
                {
                    name: 'phone',
                    type: 'int',
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AccessHistory1726684156827 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'access_history',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'user_id',
                    type: 'int'
                },
                {
                    name: 'room_id',
                    type: 'int',
                },
                {
                    name: 'entry_date',
                    type: 'datetime',
                    isNullable: false
                },
                {
                    name: 'exit_date',
                    type: 'datetime',
                    isNullable: true
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: "CASCADE"
                },
                {
                    columnNames: ['room_id'],
                    referencedTableName: 'rooms',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('access_history')
    }

}

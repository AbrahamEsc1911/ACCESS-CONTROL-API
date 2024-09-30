import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Access1726684117677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'access',
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
                    type: 'int'
                },
                {
                    name: 'entry_date',
                    type: 'datetime',
                    isNullable: false
                },
                {
                    name: 'exit_date',
                    type: 'datetime',
                    isNullable: false
                },
                {
                    name: 'state',
                    type: 'enum',
                    enum: ['reserved', 'in_use', 'no_show', 'cancelled'],
                    default: "'reserved'"
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
        await queryRunner.dropTable('access')
    }

}

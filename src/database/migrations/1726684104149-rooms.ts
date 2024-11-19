import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Rooms1726684104149 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'rooms',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'room',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'capacity',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'room_type',
                    type: 'enum',
                    enum: ['meetings', 'office'],
                    isNullable: false,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rooms')
    }

}

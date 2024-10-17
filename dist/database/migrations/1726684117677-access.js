"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Access1726684117677 = void 0;
const typeorm_1 = require("typeorm");
class Access1726684117677 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
                        enum: ['reserved', 'used', 'no_show', 'cancelled'],
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('access');
        });
    }
}
exports.Access1726684117677 = Access1726684117677;

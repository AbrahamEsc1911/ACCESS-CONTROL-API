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
exports.AccessHistory1726684156827 = void 0;
const typeorm_1 = require("typeorm");
class AccessHistory1726684156827 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('access_history');
        });
    }
}
exports.AccessHistory1726684156827 = AccessHistory1726684156827;

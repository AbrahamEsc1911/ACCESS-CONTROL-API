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
exports.Users1726684076550 = void 0;
const typeorm_1 = require("typeorm");
class Users1726684076550 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
                        name: 'dni',
                        type: 'varchar',
                        length: '9',
                        isNullable: false,
                    },
                    {
                        name: 'phone',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'role',
                        type: 'enum',
                        enum: ['user', 'admin'],
                        default: "'user'",
                        isNullable: false
                    }
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('users');
        });
    }
}
exports.Users1726684076550 = Users1726684076550;

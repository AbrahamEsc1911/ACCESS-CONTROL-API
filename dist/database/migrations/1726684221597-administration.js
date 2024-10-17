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
exports.Administration1726684221597 = void 0;
const typeorm_1 = require("typeorm");
class Administration1726684221597 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('administration');
        });
    }
}
exports.Administration1726684221597 = Administration1726684221597;

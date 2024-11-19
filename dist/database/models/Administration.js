"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administration = void 0;
const typeorm_1 = require("typeorm");
let Administration = class Administration extends typeorm_1.BaseEntity {
};
exports.Administration = Administration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Administration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'report_date' }),
    __metadata("design:type", Date)
], Administration.prototype, "report_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_access' }),
    __metadata("design:type", Number)
], Administration.prototype, "total_access", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_absences' }),
    __metadata("design:type", Number)
], Administration.prototype, "total_absences", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'frequent_people' }),
    __metadata("design:type", Number)
], Administration.prototype, "frequent_people", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'less_frequent_people' }),
    __metadata("design:type", Number)
], Administration.prototype, "less_frequent_people", void 0);
exports.Administration = Administration = __decorate([
    (0, typeorm_1.Entity)()
], Administration);

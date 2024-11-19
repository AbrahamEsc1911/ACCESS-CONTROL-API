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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const Access_1 = require("./Access");
const AccessHistory_1 = require("./AccessHistory");
let Users = class Users extends typeorm_1.BaseEntity {
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'StartUp' }),
    __metadata("design:type", String)
], Users.prototype, "StartUp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email' }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password' }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dni' }),
    __metadata("design:type", String)
], Users.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone' }),
    __metadata("design:type", Number)
], Users.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role' }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Access_1.Access, access => access.user),
    __metadata("design:type", Array)
], Users.prototype, "access", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AccessHistory_1.AccessHistory, accessHistory => accessHistory.user),
    __metadata("design:type", AccessHistory_1.AccessHistory)
], Users.prototype, "accessHistory", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);

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
exports.Rooms = void 0;
const typeorm_1 = require("typeorm");
const Access_1 = require("./Access");
const AccessHistory_1 = require("./AccessHistory");
let Rooms = class Rooms extends typeorm_1.BaseEntity {
};
exports.Rooms = Rooms;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rooms.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room' }),
    __metadata("design:type", String)
], Rooms.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'capacity' }),
    __metadata("design:type", Number)
], Rooms.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_type' }),
    __metadata("design:type", String)
], Rooms.prototype, "room_type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Access_1.Access, access => access.room),
    __metadata("design:type", Array)
], Rooms.prototype, "access", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AccessHistory_1.AccessHistory, accessHistory => accessHistory.room),
    __metadata("design:type", AccessHistory_1.AccessHistory)
], Rooms.prototype, "accessHistory", void 0);
exports.Rooms = Rooms = __decorate([
    (0, typeorm_1.Entity)()
], Rooms);

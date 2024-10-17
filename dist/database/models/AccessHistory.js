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
exports.AccessHistory = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Rooms_1 = require("./Rooms");
let AccessHistory = class AccessHistory extends typeorm_1.BaseEntity {
};
exports.AccessHistory = AccessHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AccessHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], AccessHistory.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_id' }),
    __metadata("design:type", Number)
], AccessHistory.prototype, "room_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entry_date' }),
    __metadata("design:type", Date)
], AccessHistory.prototype, "entry_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exit_date' }),
    __metadata("design:type", Date)
], AccessHistory.prototype, "exit_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, user => user.accessHistory),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Users_1.Users)
], AccessHistory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Rooms_1.Rooms, room => room.accessHistory),
    (0, typeorm_1.JoinColumn)({ name: 'room_id' }),
    __metadata("design:type", Rooms_1.Rooms)
], AccessHistory.prototype, "room", void 0);
exports.AccessHistory = AccessHistory = __decorate([
    (0, typeorm_1.Entity)()
], AccessHistory);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = require("./database/db");
const app = (0, express_1.default)();
const port = process.env.PORT_CONECTION || 3050;
app.use(express_1.default.json());
db_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
})
    .catch(error => {
    console.log(error);
});

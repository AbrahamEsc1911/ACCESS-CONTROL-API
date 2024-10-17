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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerAdmin = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../database/models/Users");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password, StartUp, dni, phone } = req.body;
        if (!email || !password || !StartUp || !dni || !phone) {
            return res.status(400).json({
                success: false,
                message: 'All values are requiered'
            });
        }
        if (password.length < 8 || password.length > 12) {
            return res.status(400).json({
                success: false,
                message: 'The password must be between 8 and 12 characters long'
            });
        }
        if (dni.length !== 9) {
            return res.status(400).json({
                success: false,
                message: 'check DNI'
            });
        }
        const passHashed = bcrypt_1.default.hashSync(password, 10);
        const newUser = yield Users_1.Users.create({
            name: name,
            email: email,
            password: passHashed,
            StartUp: StartUp,
            dni: dni,
            phone: phone
        }).save();
        const { password: pass } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        res.status(201).json({
            success: true,
            message: 'user created',
            data: userWithoutPassword
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Error creating new user',
            error: error
        });
    }
});
exports.register = register;
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password, StartUp, dni, phone } = req.body;
        if (!email || !password || !StartUp || !dni || !phone) {
            return res.status(400).json({
                success: false,
                message: 'All values are requiered'
            });
        }
        if (password.length < 8 || password.length > 12) {
            return res.status(400).json({
                success: false,
                message: 'The password must be between 8 and 12 characters long'
            });
        }
        if (dni.length !== 9) {
            return res.status(400).json({
                success: false,
                message: 'check DNI'
            });
        }
        const passHashed = bcrypt_1.default.hashSync(password, 10);
        const newAdmin = yield Users_1.Users.create({
            name: name,
            email: email,
            password: passHashed,
            StartUp: StartUp,
            dni: dni,
            phone: phone,
            role: 'admin'
        }).save();
        const { password: pass } = newAdmin, userWithoutPassword = __rest(newAdmin, ["password"]);
        res.status(201).json({
            success: true,
            message: 'admin created',
            data: userWithoutPassword
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Error creating new admin',
            error: error
        });
    }
});
exports.registerAdmin = registerAdmin;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'email and password are required'
            });
        }
        const user = yield Users_1.Users.findOne({
            where: { email: email }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'email or pasword invalid'
            });
        }
        const passCompared = bcrypt_1.default.compareSync(password, user.password);
        if (!passCompared) {
            return res.status(400).json({
                success: false,
                message: 'email or password invalid'
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            role: user.role,
            email: user.email
        }, process.env.SECRET_KEY);
        res.status(200).json({
            success: true,
            message: 'user logged',
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while login',
            error: error
        });
    }
});
exports.login = login;

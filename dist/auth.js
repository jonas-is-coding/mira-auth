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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mira = void 0;
// src/auth.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const secret = process.env.MIRA_SECRET;
if (!secret) {
    throw new Error("MIRA_SECRET is not set in the environment variables.");
}
class Mira {
    constructor(adapter) {
        this.adapter = adapter;
    }
    createSession(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Erstelle und signiere ein JWT Token
            const token = jsonwebtoken_1.default.sign({ userId }, secret);
            return { id: token };
        });
    }
    validateSession(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, secret);
                return decoded;
            }
            catch (err) {
                if (err.name === 'TokenExpiredError') {
                    throw new Error('Session expired');
                }
                else if (err.name === 'JsonWebTokenError') {
                    throw new Error('Invalid session');
                }
                else {
                    throw new Error('Could not validate session');
                }
            }
        });
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                return hashedPassword;
            }
            catch (err) {
                throw new Error('Could not hash password');
            }
        });
    }
}
exports.Mira = Mira;

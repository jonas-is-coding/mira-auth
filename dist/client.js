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
exports.getUser = exports.signIn = void 0;
// src/client.ts
const mira_1 = require("./mira");
const mira = new mira_1.Mira();
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error('Failed to sign in');
    }
    const data = yield response.json();
    return data;
});
exports.signIn = signIn;
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('/api/auth');
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    const data = yield response.json();
    return data;
});
exports.getUser = getUser;

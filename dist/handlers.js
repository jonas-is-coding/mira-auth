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
exports.handlers = void 0;
const server_1 = require("next/server");
const mira_1 = require("./mira");
const middleware_1 = require("./middleware");
const mira = new mira_1.Mira();
const handlePost = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = yield request.json();
        console.log(`Attempting to sign in with email: ${email}`);
        const user = yield mira.getUserByEmail(email);
        if (!user) {
            console.log("User not found for email:", email);
            return server_1.NextResponse.json({ error: "User not found" }, { status: 401 });
        }
        const passwordResult = yield mira.comparePasswords(password, user.password);
        if (passwordResult.error) {
            console.log("Invalid password for email:", email);
            return server_1.NextResponse.json({ error: passwordResult.error }, { status: 401 });
        }
        const result = yield mira.createSession({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        const headers = new Headers();
        headers.append("Set-Cookie", `mira_token=${result.id}; HttpOnly; Path=/;`);
        return server_1.NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } }, { status: 200, headers });
    }
    catch (error) {
        console.error("Sign-in error:", error.message);
        return server_1.NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
});
const handleGet = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user; // Benutzerinformationen von Middleware
    if (!user) {
        return server_1.NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const userData = yield mira.getUserById(user.userId);
        return server_1.NextResponse.json({ user: userData }, { status: 200 });
    }
    catch (error) {
        return server_1.NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
});
exports.handlers = {
    POST: handlePost,
    GET: (0, middleware_1.authMiddleware)(handleGet), // Middleware auf GET anwenden
};

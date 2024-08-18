var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NextResponse } from "next/server";
import { Mira } from "./mira";
import { authMiddleware } from "./middleware";
const mira = new Mira();
const handlePost = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = yield request.json();
        console.log(`Attempting to sign in with email: ${email}`);
        const result = yield mira.signIn(email, password);
        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 401 });
        }
        const headers = new Headers();
        headers.append("Set-Cookie", `mira_token=${result.token}; HttpOnly; Path=/;`);
        return NextResponse.json({ user: { email, role: result.role } }, { status: 200, headers });
    }
    catch (error) {
        console.error("Sign-in error:", error.message);
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
});
const handleGet = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user; // Benutzerinformationen von Middleware
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const userData = yield mira.getUserById(user.userId);
        return NextResponse.json({ user: userData }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
});
const handleDelete = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield mira.signOut();
        return NextResponse.json({ message: result.success }, { status: 200, headers: result.headers });
    }
    catch (error) {
        console.error("Sign-out error:", error.message);
        return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
    }
});
export const handlers = {
    POST: handlePost,
    GET: authMiddleware(handleGet),
    DELETE: authMiddleware(handleDelete),
};

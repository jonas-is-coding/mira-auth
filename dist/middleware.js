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
import jwt from "jsonwebtoken";
const secret = process.env.MIRA_SECRET || "default_secret";
export const authMiddleware = (handler) => {
    return (request) => __awaiter(void 0, void 0, void 0, function* () {
        const cookies = request.cookies;
        const tokenCookie = cookies.get("mira_token");
        const token = tokenCookie ? tokenCookie.value : "";
        if (!token) {
            console.log("Auth token missing"); // Debugging
            return NextResponse.json({ message: "Auth token missing" }, { status: 401 });
        }
        try {
            const decoded = jwt.verify(token, secret);
            console.log("Token decoded:", decoded); // Debugging
            request.user = decoded;
            return handler(request);
        }
        catch (err) {
            console.error("Token verification error:", err); // Debugging
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }
    });
};

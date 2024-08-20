var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import { MiraAuthError, MissingEnvVariableError } from "./errors";
import { db } from "./db";
import bcrypt from "bcryptjs";
const secret = process.env.MIRA_SECRET;
const url = process.env.MIRA_AUTH_URL || "http://localhost:3000";
if (!secret) {
    throw new MissingEnvVariableError("MIRA_SECRET is not set in the environment variables.");
}
export class Mira {
    createSession(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, email, role } = options;
            if (!userId) {
                throw new MiraAuthError("userId is required for creating a session");
            }
            const payload = {
                userId,
            };
            if (email)
                payload.email = email;
            if (role)
                payload.role = role;
            const token = jwt.sign(payload, secret);
            return { id: token };
        });
    }
    validateSession(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jwt.verify(token, secret);
                return decoded;
            }
            catch (err) {
                if (err.name === "TokenExpiredError") {
                    throw new MiraAuthError("Session expired");
                }
                else if (err.name === "JsonWebTokenError") {
                    throw new MiraAuthError("Invalid session");
                }
                else {
                    throw new MiraAuthError("Could not validate session");
                }
            }
        });
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.hash(password, 10);
        });
    }
    comparePasswords(submittedPassword, storedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compare(submittedPassword, storedPassword);
        });
    }
    createUser({ email, password, role, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield this.hashPassword(password);
                const newUser = yield db.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        role,
                    },
                });
                return newUser;
            }
            catch (err) {
                throw new Error("Error creating user: " + err.message);
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db.user.findUnique({
                    where: { id: userId },
                });
            }
            catch (err) {
                throw new Error("Error fetching user by ID: " + err.message);
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db.user.findUnique({
                    where: { email },
                });
            }
            catch (err) {
                throw new Error("Error fetching user by email: " + err.message);
            }
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`${url}/api/auth`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });
                if (!res.ok) {
                    throw new Error("Failed to sign in");
                }
                const data = yield res.json();
                return data;
            }
            catch (error) {
                console.error("Sign-in error:", error.message);
                throw error;
            }
        });
    }
    useSession() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${url}/api/auth`);
            if (!res.ok) {
                throw new Error("Failed to sign in");
            }
            const data = yield res.json();
            return data.user;
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = new Headers();
            headers.append("Set-Cookie", `mira_token=; HttpOnly; Path=/; Max-Age=0;`);
            return { success: "Signed out successfully", headers };
        });
    }
}

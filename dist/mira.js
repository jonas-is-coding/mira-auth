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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const errors_1 = require("./errors");
const db_1 = require("./db");
const secret = process.env.MIRA_SECRET;
if (!secret) {
    throw new errors_1.MissingEnvVariableError("MIRA_SECRET is not set in the environment variables.");
}
class Mira {
    createSession(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, email, role } = options;
            if (!userId) {
                throw new errors_1.MiraAuthError("userId is required for creating a session");
            }
            const payload = {
                userId,
            };
            if (email)
                payload.email = email;
            if (role)
                payload.role = role;
            const token = jsonwebtoken_1.default.sign(payload, secret);
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
                if (err.name === "TokenExpiredError") {
                    throw new errors_1.MiraAuthError("Session expired");
                }
                else if (err.name === "JsonWebTokenError") {
                    throw new errors_1.MiraAuthError("Invalid session");
                }
                else {
                    throw new errors_1.MiraAuthError("Could not validate session");
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
                throw new Error("Could not hash password");
            }
        });
    }
    comparePasswords(submittedPassword, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordMatch = yield bcrypt_1.default.compare(submittedPassword, userPassword);
                if (!passwordMatch) {
                    return { error: "Invalid password" };
                }
                return { success: "Password is correct" };
            }
            catch (err) {
                console.error("Error comparing passwords:", err.message);
                throw new Error("An error occurred while comparing the passwords");
            }
        });
    }
    createUser({ email, password, role, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield this.hashPassword(password);
                const newUser = yield db_1.db.user.create({
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
                return yield db_1.db.user.findUnique({
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
                return yield db_1.db.user.findUnique({
                    where: { email },
                });
            }
            catch (err) {
                throw new Error("Error fetching user by email: " + err.message);
            }
        });
    }
    signIn(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ user: { id: user.id, email: user.email, role: user.role } }, secret);
            return {
                token,
                user: { id: user.id, email: user.email, role: user.role }
            };
        });
    }
}
exports.Mira = Mira;

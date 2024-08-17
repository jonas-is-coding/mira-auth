import jwt from "jsonwebtoken";
export declare class Mira {
    createSession(options: {
        userId: string;
        email?: string;
        role?: string;
    }): Promise<{
        id: string;
    }>;
    validateSession(token: string): Promise<string | jwt.JwtPayload>;
    hashPassword(password: string): Promise<string>;
    getUserById(userId: string): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
}

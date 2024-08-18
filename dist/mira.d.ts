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
    getUserById(userId: string): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    signIn(email: string, password: string): Promise<any>;
}

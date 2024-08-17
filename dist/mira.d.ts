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
    comparePasswords(submittedPassword: string, user: any): Promise<{
        error: string;
        success?: undefined;
    } | {
        success: string;
        error?: undefined;
    }>;
    createUser({ email, hashedPassword, role, }: {
        email: string;
        hashedPassword: string;
        role?: string;
    }): Promise<any>;
    getUserById(userId: string): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
}

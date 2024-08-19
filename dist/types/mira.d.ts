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
    comparePasswords(submittedPassword: string, storedPassword: string): Promise<boolean>;
    createUser({ email, password, role, }: {
        email: string;
        password: string;
        role?: string;
    }): Promise<any>;
    getUserById(userId: string): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    signIn(email: string, password: string): Promise<{
        error: string;
        success?: undefined;
        token?: undefined;
        role?: undefined;
    } | {
        success: string;
        token: string;
        role: any;
        error?: undefined;
    }>;
    useSession(): Promise<any>;
    signOut(): Promise<{
        success: string;
        headers: Headers;
    }>;
}

import jwt from 'jsonwebtoken';
export declare class Mira {
    private adapter;
    constructor(adapter: Adapter);
    createSession(userId: string): Promise<{
        id: string;
    }>;
    validateSession(token: string): Promise<string | jwt.JwtPayload>;
    hashPassword(password: string): Promise<string>;
}
export interface Adapter {
    getUserById(id: string): Promise<any>;
    createUser(user: any): Promise<any>;
}

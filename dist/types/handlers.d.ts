import { NextRequest, NextResponse } from "next/server";
export declare const handlers: {
    POST: (request: NextRequest) => Promise<NextResponse<{
        error: string;
    }> | NextResponse<{
        user: {
            id: any;
            email: any;
            role: any;
        };
    }>>;
    GET: (request: NextRequest) => Promise<Response>;
    DELETE: (request: NextRequest) => Promise<Response>;
};

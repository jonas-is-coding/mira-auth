import { NextRequest } from "next/server";
export declare const authMiddleware: (handler: (request: NextRequest) => Promise<Response>) => (request: NextRequest) => Promise<Response>;

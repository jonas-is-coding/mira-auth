import { NextRequest } from "next/server";
export declare const authMiddleware: (handler?: ((request: NextRequest) => Promise<Response>) | undefined) => (request: NextRequest) => Promise<Response>;
export { authMiddleware as middleware };

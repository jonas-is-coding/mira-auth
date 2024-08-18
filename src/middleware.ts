import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

const secret = process.env.MIRA_SECRET || "default_secret";

export const authMiddleware = (
  handler: (request: NextRequest) => Promise<Response>
) => {
  return async (request: NextRequest) => {
    const cookies = request.cookies;

    const tokenCookie = cookies.get("mira_token");

    const token = tokenCookie ? tokenCookie.value : "";

    if (!token) {
      console.log("Auth token missing"); // Debugging

      return NextResponse.json(
        { message: "Auth token missing" },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, secret);

      console.log("Token decoded:", decoded); // Debugging

      (request as any).user = decoded;

      return handler(request);
    } catch (err) {
      console.error("Token verification error:", err); // Debugging

      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  };
};
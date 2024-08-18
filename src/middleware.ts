import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MissingEnvVariableError } from "./errors";

const secret = process.env.MIRA_SECRET;

if (!secret) {
  throw new MissingEnvVariableError(
    "MIRA_SECRET is not set in the environment variables."
  );
}

// Diese Funktion erstellt die Middleware, mit einem optionalen `customHandler` für zusätzliche Logik
export const authMiddleware = (
  handler?: (request: NextRequest) => Promise<Response>
) => {
  return async (request: NextRequest) => {
    const cookies = request.cookies;
    const tokenCookie = cookies.get("mira_token");
    const token = tokenCookie ? tokenCookie.value : "";

    if (!token) {
      console.log("Auth token missing");
      return NextResponse.json(
        { message: "Auth token missing" },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, secret);
      console.log("Token decoded:", decoded);
      (request as any).user = decoded;

      // Wenn ein `handler` definiert wurde, rufe ihn auf, andernfalls setze die Ausführung fort
      if (handler) {
        return handler(request);
      } else {
        return NextResponse.next();
      }
    } catch (err) {
      console.error("Token verification error:", err);
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  };
};

// Standard-Export, falls der Nutzer keine Anpassungen vornehmen will
export { authMiddleware as middleware };
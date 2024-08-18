import { NextRequest, NextResponse } from "next/server";
import { Mira } from "./mira";
import { authMiddleware } from "./middleware";

const mira = new Mira();

const handlePost = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    console.log(`Attempting to sign in with email: ${email}`);

    const result = await mira.signIn(email, password);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    const headers = new Headers();
    headers.append("Set-Cookie", `mira_token=${result.token}; HttpOnly; Path=/;`);

    return NextResponse.json(
      { user: { email, role: result.role } },
      { status: 200, headers }
    );
  } catch (error: any) {
    console.error("Sign-in error:", error.message);

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
};

const handleGet = async (request: NextRequest) => {
  const user = (request as any).user; // Benutzerinformationen von Middleware

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userData = await mira.getUserById(user.userId);

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};

const handleDelete = async (request: NextRequest) => {
  try {
    const result = await mira.signOut();

    return NextResponse.json(
      { message: result.success },
      { status: 200, headers: result.headers }
    );
  } catch (error: any) {
    console.error("Sign-out error:", error.message);

    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
};

export const handlers = {
  POST: handlePost,
  GET: authMiddleware(handleGet),
  DELETE: authMiddleware(handleDelete),
};
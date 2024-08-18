import { NextRequest, NextResponse } from "next/server";

import { Mira } from "./mira";

import { authMiddleware } from "./middleware";

const mira = new Mira();

const handlePost = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    console.log(`Attempting to sign in with email: ${email}`);

    const user = await mira.getUserByEmail(email);

    if (!user) {
      console.log("User not found for email:", email);

      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const passwordResult = await mira.comparePasswords(password, user.password);

    if (passwordResult.error) {
      console.log("Invalid password for email:", email);

      return NextResponse.json(
        { error: passwordResult.error },
        { status: 401 }
      );
    }

    const result = await mira.createSession({
      userId: user.id,

      email: user.email,

      role: user.role,
    });

    const headers = new Headers();

    headers.append("Set-Cookie", `mira_token=${result.id}; HttpOnly; Path=/;`);

    return NextResponse.json(
      { user: { id: user.id, email: user.email, role: user.role } },
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

export const handlers = {
  POST: handlePost, // Middleware nicht auf POST anwenden

  GET: authMiddleware(handleGet), // Middleware auf GET anwenden
};
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MiraAuthError, MissingEnvVariableError } from "./errors";
import { db } from "./db";

const secret = process.env.MIRA_SECRET;

if (!secret) {
  throw new MissingEnvVariableError(
    "MIRA_SECRET is not set in the environment variables."
  );
}

export class Mira {
  async createSession(options: {
    userId: string;

    email?: string;

    role?: string;
  }) {
    const { userId, email, role } = options;

    if (!userId) {
      throw new MiraAuthError("userId is required for creating a session");
    }

    const payload: { userId: string; email?: string; role?: string } = {
      userId,
    };

    if (email) payload.email = email;

    if (role) payload.role = role;

    const token = jwt.sign(payload, secret!);

    return { id: token };
  }

  async validateSession(token: string) {
    try {
      const decoded = jwt.verify(token, secret!);

      return decoded;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        throw new MiraAuthError("Session expired");
      } else if (err.name === "JsonWebTokenError") {
        throw new MiraAuthError("Invalid session");
      } else {
        throw new MiraAuthError("Could not validate session");
      }
    }
  }

  async hashPassword(password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      return hashedPassword;
    } catch (err: any) {
      throw new Error("Could not hash password");
    }
  }

  async comparePasswords(submittedPassword: string, userPassword: string) {
    try {
      const passwordMatch = await bcrypt.compare(
        submittedPassword,
        userPassword
      );

      if (!passwordMatch) {
        return { error: "Invalid password" };
      }

      return { success: "Password is correct" };
    } catch (err: any) {
      console.error("Error comparing passwords:", err.message);

      throw new Error("An error occurred while comparing the passwords");
    }
  }

  async createUser({
    email,

    password,

    role,
  }: {
    email: string;

    password: string;

    role?: string;
  }) {
    try {
      const hashedPassword = await this.hashPassword(password);

      const newUser = await db.user.create({
        data: {
          email,

          password: hashedPassword,

          role,
        },
      });

      return newUser;
    } catch (err: any) {
      throw new Error("Error creating user: " + err.message);
    }
  }

  async getUserById(userId: string) {
    try {
      return await db.user.findUnique({
        where: { id: userId },
      });
    } catch (err: any) {
      throw new Error("Error fetching user by ID: " + err.message);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await db.user.findUnique({
        where: { email },
      });
    } catch (err: any) {
      throw new Error("Error fetching user by email: " + err.message);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error("Sign-in error:", error.message);
      throw error;
    }
  }
}
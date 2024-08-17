import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MiraAuthError, MissingEnvVariableError } from './errors';

const secret = process.env.MIRA_SECRET;

if (!secret) {
  throw new MissingEnvVariableError(
    "MIRA_SECRET is not set in the environment variables."
  );
}

export class Mira {
  private adapter: Adapter;

  constructor(adapter: Adapter) {
    this.adapter = adapter;
  }

  async createSession(userId: string) {
    // Erstelle und signiere ein JWT Token
    const token = jwt.sign({ userId }, secret!);
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
}

export interface Adapter {
  getUserById(id: string): Promise<any>;
  createUser(user: any): Promise<any>;
}

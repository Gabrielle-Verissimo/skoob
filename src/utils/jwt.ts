import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserError, UserErrorCode } from "../graphql/modules/user/UserError";

const secret = process.env.JWT_SECRET;

export function generateToken(userId: string, email: string, rememberMe: boolean = false) {
  const timeExpire = rememberMe ? "7d" : "1h";

  if (!secret) {
    throw new Error("ERRO FATAL: Variável de ambiente JWT_SECRET não está configurada!");
  }
  const token = jwt.sign({ id: userId, email }, secret, { expiresIn: timeExpire });
  return `Bearer ${token}`;
}

export function verifyToken(token: string) {
  if (!secret) {
    throw new Error("ERRO FATAL: Variável de ambiente JWT_SECRET não está configurada!");
  }

  try {
    return jwt.verify(token, secret) as { id: string; email: string };
  } catch (_err) {
    throw UserError("Token inválido", UserErrorCode.UNAUTHENTICATED, "O token fornecido é inválido ou expirou.");
  }
}

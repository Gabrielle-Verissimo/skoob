import { generateToken } from "../../../utils/jwt";
import { UserError, UserErrorCode } from "./UserError";
import type { Login, LoginInput } from "./user.model";
import { PrismaFindByEmail } from "./user.repository";

export async function login(input: LoginInput): Promise<Login> {
  const user = await PrismaFindByEmail(input.email);
  if (!user) {
    throw UserError("Falha no login", UserErrorCode.BAD_USER_INPUT, "Email ou senha incorretos");
  }

  if (user.password !== input.password) {
    throw UserError("Falha no login", UserErrorCode.BAD_USER_INPUT, "Email ou senha incorretos");
  }
  return {
    token: generateToken(user.id, user.email, input.rememberMe),
    name: user.name,
  };
}

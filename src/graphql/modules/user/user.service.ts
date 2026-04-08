import { hashPassword, verifyPassword } from "@utils/hash";
import { generateToken } from "@utils/jwt";
import { UserError, UserErrorCode } from "./UserError";
import type { Login, LoginInput, RegisterInput, UserResponse } from "./user.model";
import { PrismaCreate, PrismaFindByEmail } from "./user.repository";

export async function login(input: LoginInput): Promise<Login> {
  const user = await PrismaFindByEmail(input.email);
  if (!user) {
    throw UserError("Falha no login", UserErrorCode.BAD_USER_INPUT, "Email ou senha incorretos");
  }

  const isPasswordValid = await verifyPassword(input.password, user.password);

  if (!isPasswordValid) {
    throw UserError("Falha no login", UserErrorCode.BAD_USER_INPUT, "Email ou senha incorretos");
  }
  return {
    token: generateToken(user.id, user.email, input.rememberMe),
    name: user.name,
  };
}

export async function register(input: RegisterInput): Promise<UserResponse> {
  const encryptedPassword = await hashPassword(input.password);
  const response = await PrismaCreate({ ...input, password: encryptedPassword });
  const user = { ...response, userName: response.user_name };
  return user;
}

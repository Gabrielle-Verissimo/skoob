import { describe, expect, test, vi } from "vitest";
import { prismaMock } from "../../../../../lib/prisma.mock";
import { verifyPassword } from "../../../../utils/hash";
import { generateToken } from "../../../../utils/jwt";
import { PrismaFindByEmail } from "../user.repository";
import { login } from "../user.service";

vi.mock("../../../../utils/jwt", () => ({
  generateToken: vi.fn(() => "token-falso-123"),
}));

vi.mock("../../../../utils/hash", () => ({
  verifyPassword: vi.fn(),
}));

describe("User Login", () => {
  test("should return a token if login successfully with correct credentials", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: "123",
      name: "João Silva",
      email: "joao@email.com",
      password: "senha-super-secreta",
    } as any);
    const input = {
      email: "joao@email.com",
      password: "senha-super-secreta",
      rememberMe: true,
    };
    vi.mocked(verifyPassword).mockResolvedValue(true);

    const response = await login(input);

    expect(response).toEqual({
      token: "token-falso-123",
      name: "João Silva",
    });

    expect(generateToken).toHaveBeenCalledWith("123", "joao@email.com", true);
  });

  test("should throw UserError if user is not found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    const input = {
      email: "naoexiste@email.com",
      password: "senhaqualquer",
    };

    await expect(login(input)).rejects.toThrow("Falha no login");
  });

  test("should throw UserError if password is incorrect", async () => {
    vi.mocked(PrismaFindByEmail).mockResolvedValue({
      id: "1",
      name: "João",
      email: "joao@email.com",
      password: "senha-correta-banco",
    } as any);

    const input = {
      email: "joao@email.com",
      password: "senha-errada-digitada",
    };
    vi.mocked(verifyPassword).mockResolvedValue(false);

    await expect(login(input)).rejects.toThrow("Falha no login");
  });
});

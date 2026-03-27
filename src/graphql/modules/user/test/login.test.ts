import { describe, expect, test, vi } from "vitest";
import { generateToken } from "../../../../utils/jwt";
import { PrismaFindByEmail } from "../user.repository";
import { login } from "../user.service";

vi.mock("../user.repository", () => ({
  PrismaFindByEmail: vi.fn(),
}));

vi.mock("../../../../utils/jwt", () => ({
  generateToken: vi.fn(() => "token-falso-123"),
}));

describe("User Login", () => {
  test("should return a token if login successfully with correct credentials", async () => {
    vi.mocked(PrismaFindByEmail).mockResolvedValue({
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

    const response = await login(input);

    expect(response).toEqual({
      token: "token-falso-123",
      name: "João Silva",
    });

    expect(generateToken).toHaveBeenCalledWith("123", "joao@email.com", true);
  });

  test("should throw UserError if user is not found", async () => {
    vi.mocked(PrismaFindByEmail).mockResolvedValue(null);
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

    await expect(login(input)).rejects.toThrow("Falha no login");
  });
});

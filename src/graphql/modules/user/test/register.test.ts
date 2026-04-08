import { describe, expect, test, vi } from "vitest";
import { prismaMock } from "../../../../../lib/prisma.mock";
import { hashPassword } from "../../../../utils/hash";

vi.mock("../../../../utils/hash", () => ({
  hashPassword: vi.fn(() => "hash-falso-123"),
}));

import { register } from "../user.service";

describe("User Register", () => {
  test("should register a user successfully", async () => {
    const input = {
      name: "Maria Silva",
      userName: "maria_silva",
      email: "maria@gmail.com",
      password: "senha-super-secreta",
    };

    prismaMock.user.create.mockResolvedValue({
      id: "456",
      name: input.name,
      email: input.email,
      user_name: input.userName,
    } as any);

    const response = await register(input);

    expect(hashPassword).toHaveBeenCalledWith(input.password);
    expect(response).toEqual({
      id: "456",
      name: input.name,
      email: input.email,
      userName: input.userName,
    });
  });
});

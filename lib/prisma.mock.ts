import type { PrismaClient } from "@prisma/client";
import { vi } from "vitest";
import { type DeepMockProxy, mockDeep } from "vitest-mock-extended";
import { prisma } from "./prisma";

vi.mock("./prisma", () => ({
  prisma: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

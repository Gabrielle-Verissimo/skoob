import { prisma } from "@lib/prisma";
import type { RegisterInput } from "./user.model";

export async function PrismaFindByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function PrismaCreate(input: RegisterInput) {
  return await prisma.user.create({
    data: {
      name: input.name,
      user_name: input.userName,
      email: input.email,
      password: input.password,
    },
    omit: {
      password: true,
    },
  });
}

import { prisma } from "../../../../lib/prisma";

export async function PrismaFindByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

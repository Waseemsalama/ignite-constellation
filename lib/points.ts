import { prisma } from "./prisma";

export async function addPoints(userId: string, type: string, points: number) {
  await prisma.pointTransaction.create({
    data: { userId, type, points },
  });
  await prisma.user.update({
    where: { id: userId },
    data: { points: { increment: points } },
  });
}

export async function getPointHistory(userId: string) {
  return prisma.pointTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}


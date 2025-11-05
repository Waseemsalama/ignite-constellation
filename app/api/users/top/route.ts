import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      points: true,
      city: true,
    },
    orderBy: { points: "desc" },
    take: 100,
  });
  return Response.json(users);
}


import { prisma } from "@/lib/prisma";

export async function GET() {
  const capsules = await prisma.capsule.findMany({
    where: { isPublic: true },
    include: {
      Star: {
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
          likes: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return Response.json(capsules);
}


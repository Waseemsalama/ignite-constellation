import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const userId = (session.user as any).id;

  // Get users that the current user follows
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followingIds = following.map((f) => f.followingId);

  // Get capsules from followed users
  const capsules = await prisma.capsule.findMany({
    where: {
      Star: {
        userId: {
          in: followingIds.length > 0 ? followingIds : [userId], // Include own if no follows
        },
      },
    },
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


import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session ? (session.user as any).id : null;

  const user = await prisma.user.findUnique({
    where: { referralCode: params.username },
    include: {
      crystals: {
        orderBy: { createdAt: "desc" },
        include: { capsule: true },
      },
      _count: {
        select: {
          crystals: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  let isFollowing = false;
  if (userId && userId !== user.id) {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: user.id,
        },
      },
    });
    isFollowing = !!follow;
  }

  return Response.json({ ...user, isFollowing });
}


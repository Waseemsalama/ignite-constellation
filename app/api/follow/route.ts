import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const { userId: followingId } = await req.json();
  const followerId = (session.user as any).id;
  
  if (followerId === followingId) {
    return new Response("Cannot follow yourself", { status: 400 });
  }

  try {
    await prisma.follow.create({
      data: { followerId, followingId },
    });
    return Response.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new Response("Already following", { status: 400 });
    }
    throw error;
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const { userId: followingId } = await req.json();
  const followerId = (session.user as any).id;

  await prisma.follow.deleteMany({
    where: { followerId, followingId },
  });
  return Response.json({ success: true });
}


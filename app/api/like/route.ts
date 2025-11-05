import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const { starId, commentId } = await req.json();
  const userId = (session.user as any).id;

  try {
    await prisma.like.create({
      data: { userId, starId, commentId },
    });
    return Response.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new Response("Already liked", { status: 400 });
    }
    throw error;
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const { starId, commentId } = await req.json();
  const userId = (session.user as any).id;

  await prisma.like.deleteMany({
    where: { userId, starId, commentId },
  });
  return Response.json({ success: true });
}


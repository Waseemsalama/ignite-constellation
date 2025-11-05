import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const { starId, text } = await req.json();
  const userId = (session.user as any).id;

  const comment = await prisma.comment.create({
    data: { userId, starId, text },
    include: { user: { select: { id: true, name: true, image: true } } },
  });
  return Response.json(comment);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const starId = searchParams.get("starId");
  if (!starId) return new Response("Missing starId", { status: 400 });

  const comments = await prisma.comment.findMany({
    where: { starId },
    include: { user: { select: { id: true, name: true, image: true } }, likes: true },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(comments);
}


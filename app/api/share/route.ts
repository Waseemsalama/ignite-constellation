import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const { platform } = await req.json();
  const reward = platform === "tiktok" ? 20 : 10;
  await prisma.pointTransaction.create({ data: { userId: (session.user as any).id, type: platform, points: reward } });
  await prisma.user.update({ where: { id: (session.user as any).id }, data: { points: { increment: reward } } });
  return Response.json({ success: true, points: reward });
}


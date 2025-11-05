import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateReferralCode } from "@/lib/utils";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const userId = (session.user as any).id;
  
  let user = await prisma.user.findUnique({ where: { id: userId }, select: { referralCode: true } });
  if (!user?.referralCode) {
    const code = generateReferralCode();
    await prisma.user.update({ where: { id: userId }, data: { referralCode: code } });
    return Response.json({ code });
  }
  return Response.json({ code: user.referralCode });
}


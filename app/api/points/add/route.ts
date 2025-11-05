import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addPoints } from "@/lib/points";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const { type, points } = await req.json();
  await addPoints((session.user as any).id, type, points);
  return Response.json({ success: true });
}


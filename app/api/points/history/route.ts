import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPointHistory } from "@/lib/points";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const history = await getPointHistory((session.user as any).id);
  return Response.json(history);
}


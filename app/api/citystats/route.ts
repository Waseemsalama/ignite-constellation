import { getCityStats } from "@/lib/map";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const stats = await getCityStats(city || undefined);
  return Response.json(stats);
}


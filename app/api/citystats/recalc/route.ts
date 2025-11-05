import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { updateCityStats } from "@/lib/map";

export async function POST(req: Request) {
  // Secure cron endpoint - check for secret header
  const secret = headers().get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const cities = await prisma.star.groupBy({
    by: ["city"],
    _count: { city: true },
  });

  for (const city of cities) {
    // Get country from first star in city (simplified)
    const firstStar = await prisma.star.findFirst({ where: { city: city.city } });
    // In production, you'd want to geocode city -> country
    await updateCityStats(city.city, "USA");
  }

  return Response.json({ success: true, updated: cities.length });
}


import { prisma } from "@/lib/prisma";

export async function GET() {
  const stars = await prisma.star.findMany({
    select: { id: true, city: true, color: true, brightness: true, ra: true, dec: true, z: true }
  });
  return Response.json(stars);
}


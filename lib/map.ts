import { prisma } from "./prisma";

export async function getCityStats(city?: string) {
  if (city) {
    return prisma.cityStat.findUnique({ where: { city } });
  }
  return prisma.cityStat.findMany({
    orderBy: { totalPoints: "desc" },
    take: 100,
  });
}

export async function updateCityStats(city: string, country: string) {
  const stars = await prisma.star.findMany({ where: { city } });
  const starsCount = stars.length;
  const totalPoints = stars.reduce((sum, star) => sum + (star.pointsTier * 100), 0);
  const brightness = stars.reduce((sum, star) => sum + star.brightness, 0) / starsCount || 0;

  await prisma.cityStat.upsert({
    where: { city },
    update: { starsCount, totalPoints, brightness, updatedAt: new Date() },
    create: { city, country, starsCount, totalPoints, brightness },
  });
}


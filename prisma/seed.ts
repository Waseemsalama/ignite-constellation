import { prisma } from "../lib/prisma";

async function main() {
  await prisma.cityStat.upsert({
    where: { city: "Fresno" },
    update: {},
    create: { city: "Fresno", country: "USA" },
  });

  for (let i = 0; i < 50; i++) {
    await prisma.star.create({
      data: {
        city: "Fresno",
        color: "#FFD76B",
        brightness: 1 + Math.random(),
        ra: Math.random() * 360,
        dec: Math.random() * 180 - 90,
        z: Math.random(),
      },
    });
  }

  console.log("Seeded Fresno stars");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


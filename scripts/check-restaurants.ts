import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const count = await prisma.restaurant.count();
  console.log(`Total restaurants: ${count}`);
  if (count > 0) {
    const restaurants = await prisma.restaurant.findMany();
    console.log(restaurants.map((r) => ({ id: r.id, name: r.name })));
  }
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const demoUserId = "McIMzgJA5nC8Uhpjsnw20Shmq8VfzFOM";

  // Ensure user exists
  await prisma.user.upsert({
    where: { id: demoUserId },
    update: {},
    create: {
      id: demoUserId,
      name: "Demo User",
      email: "demo@example.com",
    },
  });

  // Clean up existing data
  await prisma.product.deleteMany({ where: { userId: demoUserId } });
  await prisma.department.deleteMany({ where: { userId: demoUserId } });
  await prisma.supplier.deleteMany({ where: { userId: demoUserId } });

  // Create dependencies
  const department = await prisma.department.create({
    data: { name: "General", userId: demoUserId },
  });
  const supplier = await prisma.supplier.create({
    data: { name: "Main Supplier", userId: demoUserId },
  });

  // Create sample products
  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => ({
      userId: demoUserId,
      departmentId: department.id,
      supplierId: supplier.id,
      name: `Product ${i + 1}`,
      price: (Math.random() * 90 + 10).toFixed(2),
      stock: Math.floor(Math.random() * 60),
      delivered: Math.floor(Math.random() * 100),
      sku: `SKU-${i + 1}`,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    })),
  });

  console.log("Seed data created successfully!");
  console.log(`Created 25 products for user ID: ${demoUserId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

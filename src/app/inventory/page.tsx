import Products from "@/components/products";
import PageLayout from "@/components/layout/page-layout";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/session";

const Inventory = async () => {
  const session = await requireAuth();
  const userId = session.user.id;

  const [totalCount, products] = await Promise.all([
    prisma.product.count({
      where: {
        userId,
      },
    }),
    await prisma.product.findMany({
      where: {
        userId,
      },
      include: {
        department: true,
      },
    }),
  ]);

  const serializedProducts = products.map((product) => ({
    ...product,
    price: product.price.toNumber(),
    department: product.department.name,
  }));

  return (
    <PageLayout currentPath="/inventory">
      <Products products={serializedProducts} />
    </PageLayout>
  );
};

export default Inventory;

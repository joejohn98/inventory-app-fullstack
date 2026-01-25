import Products from "@/components/products";
import Sidebar from "@/components/sidebar";
import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/session";

const Inventory = async () => {
  const user = await getUserSession();
  const userId = user?.user.id;

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
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="lg:ml-64 p-5 md:p-8">
        <Products products={serializedProducts} />
      </main>
    </div>
  );
};

export default Inventory;

import Products from "@/components/products";
import Sidebar from "@/components/sidebar";
import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/session";

const Inventory = async () => {
  const user = await getUserSession();
  const userId = user?.user.id;

  const products = await prisma.product.findMany({
    where: {
      userId,
    },
    include: {
      department: true,
    },
  });

  const serializedProducts = products.map((product) => ({
    ...product,
    price: product.price.toNumber(),
    department: product.department.name,
  }));

  // console.log(products);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-4 md:p-8">
        <Products products={serializedProducts} />
      </main>
    </div>
  );
};

export default Inventory;

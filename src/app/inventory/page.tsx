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
  });

  // console.log(products);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-4 md:p-8">
        <Products products={products} />
      </main>
    </div>
  );
};

export default Inventory;

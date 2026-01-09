import Sidebar from "@/components/sidebar";
import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { TrendingUp } from "lucide-react";

const Dashboard = async () => {
  const user = await getUserSession();
  const userId = user?.user.id;

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar currentPath="/dashboard" />
        <main className="ml-64 p-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-yellow-800">
              Authentication Required
            </h2>
            <p className="text-yellow-600 mt-2">
              Please sign in to view the dashboard.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const totalProducts = await prisma.product.count({
    where: { userId },
  });

  const allProducts = await prisma.product.findMany({
    where: { userId },
    select: {
      price: true,
      stock: true,
      delivered: true,
      createdAt: true,
    },
  });

  const totalDelivered = allProducts.reduce((sum, product) => {
    return sum + Number(product.delivered);
  }, 0);

  const totalValue = allProducts.reduce((sum, product) => {
    return sum + Number(product.price) * Number(product.stock);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/dashboard" />

      <main className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                Dashboard
              </h2>
              <p className="text-slate-600 mt-2">
                Welcome back! Here&#39;s an overview of your inventory.
              </p>
            </div>
            <p className="text-slate-500 text-sm font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </header>

        {/* Key Metrics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Key Metrics
            </h2>
            {/* Total Products */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {totalProducts}
                </div>
                <div className="text-sm text-gray-600">Total Products</div>

                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +{totalProducts}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
              {/* Total Value */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  ${Number(totalValue).toFixed(0).padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-600">Total Products</div>

                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +${Number(totalValue).toFixed(0)}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
              {/* Total Delivered */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {totalDelivered}
                </div>
                <div className="text-sm text-gray-600">Total Delivered</div>

                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +{totalDelivered}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  */}
      </main>
    </div>
  );
};

export default Dashboard;

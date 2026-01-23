import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowLeft,
  DollarSign,
  Package,
  Store,
  Tag,
  Truck,
} from "lucide-react";
import ProductActions from "@/components/product-actions";
import Sidebar from "@/components/sidebar";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      department: true,
      supplier: true,
    },
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar currentPath="/inventory" />
        <main className="ml-64 p-4 md:p-8 flex flex-col items-center justify-center h-[70vh]">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md">
            <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Product Not Found
            </h2>
            <p className="text-gray-500 mb-6">
              The product you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link
              href="/inventory"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-sm"
            >
              Back to Inventory
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-4 md:p-8">
        <Link
          href="/inventory"
          className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Inventory
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 lg:p-8">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-6">
                <Image
                  src={product.imageUrl || "/No_Image_Available.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  priority
                  fill
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md">
                    {product.department.name || "Uncategorized"}
                  </span>
                  <span
                    className={`px-2.5 py-1 text-sm font-medium rounded-md ${
                      product.stock <= 5
                        ? "bg-rose-100 text-rose-700"
                        : product.stock <= 10
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {product.stock <= 5
                      ? "Critical Stock"
                      : product.stock <= 10
                        ? "Low Stock"
                        : "In Stock"}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {product.name}
                </h1>

                <p className="text-gray-600">
                  {product.description || "No description available."}
                </p>
              </div>
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-gray-200">
              <div className="p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Product Details
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Tag size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">SKU</p>
                        <p className="font-medium text-gray-800">
                          {product.sku}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <DollarSign size={20} className="text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium text-gray-800">
                          ${Number(product.price).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Package size={20} className="text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Stock</p>
                        <p
                          className={`font-medium ${
                            product.stock <= 5
                              ? "text-rose-600"
                              : product.stock <= 10
                                ? "text-amber-600"
                                : "text-gray-800"
                          }`}
                        >
                          {product.stock > 0
                            ? `${product.stock} Units Available`
                            : "Out of Stock"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-amber-50 rounded-lg">
                        <Truck size={20} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Delivered</p>
                        <p className="font-medium text-gray-800">
                          {product.delivered} units
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Store size={20} className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Supplier</p>
                      <p className="font-medium text-gray-800">
                        {product.supplier.name}
                      </p>
                    </div>
                  </div>

                  <ProductActions productId={product.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;

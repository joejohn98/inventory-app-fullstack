import { AlertTriangle } from "lucide-react";
import Link from "next/link";

import prisma from "@/lib/prisma";
import Sidebar from "@/components/sidebar";
import EditProductForm from "@/components/form/edit-product-form";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
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
        <main className="lg:ml-64 p-5 md:p-8 flex flex-col items-center justify-center h-[70vh]">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md">
            <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Product Not Found
            </h2>
            <p className="text--500 mb-6">
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

  const modifiedProduct = {
    ...product,
    price: product.price.toNumber(),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="lg:ml-64 p-5 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <EditProductForm product={modifiedProduct} />
          </div>
        </div>
      </main>
    </div>
  );
}

import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ProductActions from "@/components/product-actions";

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
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        href="/inventory"
        className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Inventory
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl || "/No_Image_Available.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
                    {product.department?.name || "Uncategorized"}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Price</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Stock Status</span>
                <div className="text-right">
                  <span
                    className={`block font-semibold ${
                      product.stock <= 10 ? "text-rose-600" : "text-green-600"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} Units Available`
                      : "Out of Stock"}
                  </span>
                  {product.stock <= 10 && product.stock > 0 && (
                    <span className="text-xs text-rose-500">Low Stock</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">SKU</span>
                <span className="font-mono text-gray-800">{product.sku}</span>
              </div>
            </div>

            <ProductActions productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

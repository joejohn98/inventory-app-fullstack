import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EditProductForm from "@/components/edit-product-form";

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
    return notFound();
  }

  const modifiedProduct = {
    ...product,
    price: product.price.toNumber(),
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <EditProductForm product={modifiedProduct} />
      </div>
    </div>
  );
}

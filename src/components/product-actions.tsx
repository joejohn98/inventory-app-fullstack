"use client";

import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProduct } from "@/lib/actions/product";

export default function ProductActions({ productId }: { productId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      setIsDeleting(true);
      try {
        const result = await deleteProduct(productId);
        if (result.success) {
          router.push("/inventory");
          router.refresh();
        } else {
          alert(result.message || "Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="pt-6 flex gap-3">
      <Link
        href={`/inventory/${productId}/edit`}
        className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
      >
        <Edit className="w-4 h-4" />
        Edit Product
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-4 py-2 border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 className="w-4 h-4" />
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

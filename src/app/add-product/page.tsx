import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Sidebar from "@/components/sidebar";
import AddProductForm from "@/components/form/add-product-form";
import { getUserSession } from "@/lib/session";

const AddProduct = async () => {
  await getUserSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/add-product" />
      <main className="lg:ml-64 p-5 md:p-8">
        <Link
          href="/inventory"
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1.5" />
          Back to Inventory
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <AddProductForm />
        </div>
      </main>
    </div>
  );
};

export default AddProduct;

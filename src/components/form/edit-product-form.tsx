"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AddProductFormData,
  AddProductInputData,
  addProductSchema,
} from "@/lib/validation";
import { updateProduct } from "@/lib/actions/product";
import ProductForm from "./product-form";

interface EditProductFormProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    sku: string;
    imageUrl: string | null;
    delivered: number;
    department: { name: string } | null;
    supplier: { name: string } | null;
  };
}

const EditProductForm = ({ product }: EditProductFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddProductInputData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description || "",
      department: product.department?.name || "",
      price: Number(product.price),
      stock: product.stock,
      sku: product.sku,
      supplier: product.supplier?.name || "",
      imageUrl: product.imageUrl || "",
      totalDelivered: product.delivered,
    },
  });

  const onSubmit = async (data: AddProductInputData) => {
    try {
      const result = await updateProduct(
        product.id,
        data as AddProductFormData,
      );

      if (result?.success) {
        router.push(`/inventory/${product.id}`);
        router.refresh();
      } else if (result?.message) {
        setError("root", {
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <ProductForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      onCancel={() => router.back()}
      title="Edit Product"
      description="Update product details"
      submitButtonText="Save Changes"
      cancelButtonText="Cancel"
    />
  );
};

export default EditProductForm;

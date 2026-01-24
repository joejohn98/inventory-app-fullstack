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
import { toast } from "sonner";

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
        toast.success("Product updated successfully", {
          description: `${data.name} has been updated.`,
        });
        router.push(`/inventory/${product.id}`);
        router.refresh();
      } else if (result?.errors) {
        Object.entries(result.errors).forEach(([key, messages]) => {
          setError(key as keyof AddProductInputData, {
            message: messages[0],
          });
        });
      } else if (result?.message) {
        toast.error("Product update failed", {
          description: result.message,
        });
        setError("root", {
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      const errorMessage =
        "An unexpected error occurred while updating the product. Please try again later.";

      setError("root", {
        message: errorMessage,
      });
      toast.error("Product update failed", {
        description: errorMessage,
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

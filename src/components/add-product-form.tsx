"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AddProductFormData,
  AddProductInputData,
  addProductSchema,
} from "@/lib/validation";
import { createProduct } from "@/lib/actions/product";
import ProductForm from "./product-form";

const AddProductForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddProductInputData>({
    resolver: zodResolver(addProductSchema),
  });

  const onSubmit = async (data: AddProductInputData) => {
    try {
      const result = await createProduct(data as AddProductFormData);

      if (result?.success) {
        router.push("/inventory");
      } else if (result?.message) {
        setError("root", {
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error creating product:", error);
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
      onCancel={() => router.push("/inventory")}
      title="Add New Product"
      description="Fill in the details to add a new product to inventory"
      submitButtonText="Add Product"
      cancelButtonText="Cancel"
    />
  );
};

export default AddProductForm;

"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  AddProductFormData,
  AddProductInputData,
  addProductSchema,
} from "@/lib/validation";
import { createProduct } from "@/lib/actions/product";
import ProductForm from "@/components/form/product-form";

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
        toast.success("Product created successfully", {
          description: `${data.name} has been added to inventory.`,
        });
        router.push("/inventory");
      } else if (result?.errors) {
        Object.entries(result.errors).forEach(([key, messages]) => {
          setError(key as keyof AddProductInputData, {
            message: messages[0],
          });
        });
      } else if (result?.message) {
        setError("root", {
          message: result.message,
        });
        toast.error("Product creation failed", {
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error creating product:", error);
      const errorMessage =
        "An unexpected error occurred while creating the product. Please try again later.";

      setError("root", {
        message: errorMessage,
      });
      toast.error("Product creation failed", {
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
      onCancel={() => router.push("/inventory")}
      title="Add New Product"
      description="Fill in the details to add a new product to inventory"
      submitButtonText="Add Product"
      cancelButtonText="Cancel"
    />
  );
};

export default AddProductForm;

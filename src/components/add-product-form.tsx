"use client";

import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddProductFormData,
  AddProductInputData,
  addProductSchema,
} from "@/lib/validation";

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

  console.log(errors.price);

  const onSubmit = async (data: AddProductInputData) => {
    try {
      console.log(data);
      await createProduct(data as AddProductFormData);
      router.push("/inventory");
    } catch (error) {
      console.error("Error creating product:", error);
      if (error instanceof Error) {
        setError("root", {
          message:
            error.message || "Failed to create product. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        <p className="text-gray-500 mt-1">
          Fill in the details to add a new product to inventory
        </p>
        {errors.root && (
          <p className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {errors.root.message}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                  errors.name ? "border-rose-300 bg-rose-50" : "border-gray-200"
                }`}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-rose-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department <span className="text-rose-500">*</span>
              </label>
              <select
                id="department"
                {...register("department")}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                  errors.department
                    ? "border-rose-300 bg-rose-50"
                    : "border-gray-200"
                }`}
              >
                <option value="">Select Department</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Toys">Toys</option>
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-rose-500">
                  {errors.department.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description <span className="text-gray-500">(Optional)</span>
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={4}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                  errors.description
                    ? "border-rose-300 bg-rose-50"
                    : "border-gray-200"
                }`}
                placeholder="Enter product description"
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="url"
                id="imageUrl"
                {...register("imageUrl")}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                  errors.imageUrl
                    ? "border-rose-300 bg-rose-50"
                    : "border-gray-200"
                }`}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    {...register("price")}
                    min="0"
                    step="0.01"
                    className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                      errors.price
                        ? "border-rose-300 bg-rose-50"
                        : "border-gray-200"
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-rose-500">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Stock <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  {...register("stock")}
                  min="0"
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                    errors.stock
                      ? "border-rose-300 bg-rose-50"
                      : "border-gray-200"
                  }`}
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-rose-500">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="sku"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                SKU <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="sku"
                {...register("sku")}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                  errors.sku ? "border-rose-300 bg-rose-50" : "border-gray-200"
                }`}
                placeholder="Enter SKU"
              />
              {errors.sku && (
                <p className="mt-1 text-sm text-rose-500">
                  {errors.sku.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="supplier"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Supplier <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="supplier"
                {...register("supplier")}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                  errors.supplier
                    ? "border-rose-300 bg-rose-50"
                    : "border-gray-200"
                }`}
                placeholder="Enter supplier name"
              />
              {errors.supplier && (
                <p className="mt-1 text-sm text-rose-500">
                  {errors.supplier.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="totalDelivered">Total Delivered</label>
              <input
                type="number"
                id="totalDelivered"
                {...register("totalDelivered")}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                  errors.totalDelivered
                    ? "border-rose-300 bg-rose-50"
                    : "border-gray-200"
                }`}
              />
              {errors.totalDelivered && (
                <p className="mt-1 text-sm text-rose-500">
                  {errors.totalDelivered.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/inventory")}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <X size={18} className="inline-block mr-1.5" />
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg shadow-sm transition-colors ${
              isSubmitting
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} className="inline-block mr-1.5" />
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProductForm;

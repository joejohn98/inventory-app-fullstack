"use client";

import {
  Save,
  User,
  Mail,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateUserSettingsFormData,
  updateUserSettingsSchema,
} from "@/lib/validation";
import { updateUserSettings } from "@/lib/actions/user";
import { useState, useEffect } from "react";

interface SettingsFormProps {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}

const SettingsForm = ({ user }: SettingsFormProps) => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(user.image);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<UpdateUserSettingsFormData>({
    resolver: zodResolver(updateUserSettingsSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });

  // Watch for image URL changes to update preview
  const imageUrl = watch("image");

  // Update preview when image URL changes
  useEffect(() => {
    if (imageUrl && imageUrl !== imagePreview) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl, imagePreview]);

  const onSubmit = async (data: UpdateUserSettingsFormData) => {
    setSuccessMessage(null);

    try {
      const result = await updateUserSettings(data);

      if (result?.success) {
        setSuccessMessage(result.message || "Settings updated successfully!");
        setTimeout(() => {
          router.refresh();
        }, 1500);
      } else if (result?.message) {
        setError("root", {
          type: "server",
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      setError("root", {
        type: "server",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Account Settings
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Update your account information
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">Success!</p>
              <p className="text-sm text-green-700 mt-0.5">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.root?.message && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <div>
              <p className="text-sm font-medium text-red-800">Error</p>
              <p className="text-sm text-red-700 mt-0.5">
                {errors.root?.message}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("name")}
                type="text"
                id="name"
                className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
                  errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("email")}
                type="email"
                id="email"
                className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Profile Image Field */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Profile Image
            </label>
            <div className="flex items-start space-x-4">
              {/* Image Preview */}
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xl font-bold overflow-hidden border-2 border-gray-200">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  )}
                </div>
              </div>

              {/* Image URL Input */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("image")}
                    type="url"
                    id="image"
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
                      errors.image
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    placeholder="Enter image URL (e.g., https://example.com/avatar.jpg)"
                  />
                </div>
                {errors.image && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.image.message}
                  </p>
                )}
                <p className="mt-1.5 text-xs text-gray-500">
                  Enter a valid image URL or leave blank to use initials
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center space-x-2 px-6 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors ${
              isSubmitting
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;

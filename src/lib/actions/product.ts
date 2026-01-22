"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { Department } from "@/generated/prisma";
import { AddProductFormData, addProductSchema } from "@/lib/validation";
import { getUserSession } from "@/lib/session";
import { isBlockedHost, validateImageUrl } from "../utils";
import cloudinary from "../cloudinary";

export async function createProduct(data: AddProductFormData) {
  const session = await getUserSession();
  if (!session?.user?.id) {
    return {
      message: "Unauthorized access. Please sign in.",
    };
  }
  const userId = session.user.id;

  const rawData = {
    name: data.name,
    description: data.description,
    department: data.department,
    price: data.price,
    stock: data.stock,
    sku: data.sku,
    supplier: data.supplier,
    imageUrl: data.imageUrl,
    totalDelivered: data.totalDelivered,
  };

  // Zod validation
  const validatedFields = addProductSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  const {
    name,
    description,
    department,
    price,
    stock,
    sku,
    supplier,
    imageUrl,
    totalDelivered,
  } = validatedFields.data;

  const deptName = department as Department["name"];

  let cloudinaryProductImageUrl: string | null = null;

  if (imageUrl) {
    // Validate Image URL
    const parsedUrl = validateImageUrl(imageUrl);
    if (!parsedUrl) {
      return { error: "Invalid image URL. HTTPS required." };
    }

    // Check if image URL is blocked
    if (isBlockedHost(parsedUrl.hostname)) {
      return { error: "Image URL is not allowed." };
    }

    try {
      const uploadResult = await cloudinary.uploader.upload(imageUrl, {
        folder: "inventory-app/products",
      });

      cloudinaryProductImageUrl = uploadResult.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      const err = error as { message?: string };
      if (err.message?.includes("HTML response")) {
        return {
          message:
            "The URL provided is a webpage, not an image. Please use a direct image link.",
        };
      }
      return {
        message:
          "Failed to upload product image. Ensure the URL is publicly accessible.",
      };
    }
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Find or Create Department
      const dept = await tx.department.upsert({
        where: {
          name_userId: {
            name: deptName,
            userId: userId,
          },
        },
        update: {},
        create: {
          name: deptName,
          userId: userId,
        },
      });

      // 2. Find or Create Supplier
      const supp = await tx.supplier.upsert({
        where: {
          name_userId: {
            name: supplier,
            userId: userId,
          },
        },
        update: {},
        create: {
          name: supplier,
          userId: userId,
        },
      });

      // 3. Create Product
      await tx.product.create({
        data: {
          name,
          description,
          price,
          stock,
          sku,
          imageUrl: cloudinaryProductImageUrl,
          delivered: totalDelivered,
          userId,
          departmentId: dept.id,
          supplierId: supp.id,
        },
      });
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message:
        "Database Error: Failed to create product. Ensure SKU is unique.",
    };
  }

  revalidatePath("/inventory");
  return { success: true, message: "Product created successfully!" };
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { Department } from "@/generated/prisma";
import { AddProductFormData, addProductSchema } from "@/lib/validation";
import { getUserSession } from "@/lib/session";

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
          imageUrl,
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

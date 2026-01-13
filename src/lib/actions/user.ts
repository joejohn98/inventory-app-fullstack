"use server";

import { revalidatePath } from "next/cache";

import {
  UpdateUserSettingsFormData,
  updateUserSettingsSchema,
} from "@/lib/validation";

import { getUserSession } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function updateUserSettings(data: UpdateUserSettingsFormData) {
  const session = await getUserSession();
  if (!session?.user?.id) {
    return {
      message: "Unauthorized access. Please sign in.",
    };
  }
  const userId = session.user.id;

  const rawData = {
    name: data.name,
    email: data.email,
    image: data.image,
  };

  // Zod validation
  const validatedFields = updateUserSettingsSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  const { name, email, image } = validatedFields.data;

  try {
    // Check if email already exists for another user
    if (email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== userId) {
        return {
          errors: {
            email: ["This email is already in use by another account."],
          },
          message: "Email already exists.",
        };
      }
    }

    // Update user
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        image: image || null,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to update user settings.",
    };
  }

  revalidatePath("/settings");
  return { success: true, message: "Settings updated successfully!" };
}

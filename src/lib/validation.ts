import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z.string().min(5, "Full name must be at least 5 characters long"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must be at most 20 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%?&]/,
        "Password must contain at least one special character (!@#$%?&)"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%?&]/,
      "Password must contain at least one special character (!@#$%?&)"
    ),
});

export const addProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Product price is required"),
  imageUrl: z.string().optional(),
  sku: z
    .string()
    .min(5, "Product sku is required")
    .max(16, "Product sku must be at most 16 characters long"),
  stock: z.coerce.number().min(1, "Product stock is required"),
  totalDelivered: z.coerce
    .number()
    .min(1, "Product total delivered is required"),
  department: z.string().min(1, "Product department is required"),
  supplier: z.string().min(1, "Product supplier is required"),
});

export const updateUserSettingsSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email("Invalid email address").min(1, "Email is required"),
  image: z
    .union([z.url("Must be a valid URL"), z.literal("")])
    .nullable()
    .optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export type SignUpFormData = z.infer<typeof signupSchema>;

export type AddProductInputData = z.input<typeof addProductSchema>;
export type AddProductFormData = z.output<typeof addProductSchema>;

export type UpdateUserSettingsFormData = z.infer<
  typeof updateUserSettingsSchema
>;

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

export type SignUpFormData = z.infer<typeof signupSchema>;

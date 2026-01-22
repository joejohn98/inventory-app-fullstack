"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { SignUpFormData, signupSchema } from "@/lib/validation";
import { authClient } from "@/lib/auth-client";
import SocialAuthButtons from "./auth/social-auth-buttons";

const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  const onSubmit = async (userInfo: SignUpFormData) => {
    try {
      const { fullName, email, password } = userInfo;
      const { error } = await authClient.signUp.email(
        {
          name: fullName,
          email,
          password,
          callbackURL: "/auth/sign-in",
        },
        {
          onSuccess: () => {
            router.push("/sign-in");
          },
        },
      );
      if (error) {
        setError("root", { message: error.message });
        return;
      }
    } catch (error) {
      if (error instanceof Error) setError("root", { message: error.message });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg mx-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Inventory Management
          </h2>
          <p className="text-gray-600">
            Create an account to start managing your inventory.
          </p>
        </div>

        <SocialAuthButtons isLoading={isLoading} mode="signup" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 text-gray-800"
        >
          {errors.root && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {errors.root.message}
            </div>
          )}
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  {...register("fullName")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register("password")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                {...register("confirmPassword")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md"
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-purple-600 hover:text-purple-500"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

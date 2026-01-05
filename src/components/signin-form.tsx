"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, signInSchema } from "@/lib/validation";

const SignInForm = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    await new Promise((res) => setTimeout(res, 2000));
    try {
      console.log(data);
    } catch (error) {
      console.log("error submitting form", error);
      if (error instanceof Error) {
        console.log(error.message);
        setError("root", { message: error.message });
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg mx-4">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Welcome Back!
          </h2>
          <p className="text-gray-600">Sign in to manage your inventory.</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 text-gray-800"
        >
          {errors.root && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              <p>{errors.root.message}</p>
            </div>
          )}
          <div className="space-y-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
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
                autoComplete="current-password"
                {...register("password")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don&#39;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-purple-600 hover:text-purple-500"
            >
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

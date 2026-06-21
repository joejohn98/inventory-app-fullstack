"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Something went wrong!
        </h2>

        <p className="text-gray-600 mb-8 text-sm">
          We apologize for the inconvenience. An unexpected error occurred while
          trying to process your request.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center px-6 py-2.5 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 text-left bg-gray-100 p-4 rounded-lg overflow-auto">
            <p className="text-xs font-mono text-red-600 font-semibold mb-2">
              Development Info:
            </p>
            <p className="text-xs font-mono text-gray-800 break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

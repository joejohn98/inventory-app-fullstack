"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function DepartmentsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Departments Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-7 h-7 text-red-600" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Departments Unavailable
        </h2>

        <p className="text-gray-600 mb-6 text-sm">
          We couldn&apos;t load your department data. Please try refreshing or
          come back in a moment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-sm"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Retry
          </button>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-sm"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 text-left bg-gray-100 p-3 rounded-lg overflow-auto">
            <p className="text-xs font-mono text-red-600 font-semibold mb-1">
              Dev Error:
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

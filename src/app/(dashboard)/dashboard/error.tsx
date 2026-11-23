"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-7 h-7 text-red-600" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Dashboard Unavailable
        </h2>

        <p className="text-gray-600 mb-6 text-sm">
          We couldn&apos;t load your dashboard data. This could be due to a
          temporary database issue or a network problem.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-sm"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reload Dashboard
          </button>

          <Link
            href="/inventory"
            className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to Inventory
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

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="my-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Something went wrong!
          </h1>
          <p className="text-gray-600">
            An unexpected error occurred. Please try again.
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="text-sm font-medium text-red-800 mb-2">
              Error Details (Development)
            </h3>
            <p className="text-xs text-red-700 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-1">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="space-y-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Need Help?</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Check your internet connection</p>
            <p>• Try refreshing the page</p>
            <p>• Contact support if the problem persists</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 font-mono">
            Error Code: {error.digest || "UNKNOWN"}
          </p>
        </div>
      </div>
    </div>
  );
}

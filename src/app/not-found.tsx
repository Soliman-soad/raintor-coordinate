import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 select-none">404</h1>
          <div className="relative -mt-20">
            <h2 className="text-2xl font-semibold text-gray-800">
              Page Not Found
            </h2>
            <p className="text-gray-600 mt-2">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 font-mono">
            Error Code: 404 - Not Found
          </p>
        </div>
      </div>
    </div>
  );
}

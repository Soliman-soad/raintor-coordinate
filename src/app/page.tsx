import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Raintor Coordinate
        </h1>
        <div className="flex gap-2 flex-col sm:flex-row justify-center mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/users"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              User List
            </Link>
          </div>
          <div>
            <Link
              href="/userA"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              target="_blank"
            >
              Send location
            </Link>
          </div>
          <div>
            <Link
              href="/userB"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              target="_blank"
            >
              Received location
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

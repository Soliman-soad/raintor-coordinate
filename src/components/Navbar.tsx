import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          <Link
            href="/"
            className="text-gray-800 hover:text-purple-600 transition"
          >
            Raintor Coordination
          </Link>
        </h1>
        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <Link
              href="/users"
              className="text-gray-600 hover:text-purple-600 transition"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              href="/userA"
              className="text-gray-600 hover:text-purple-600 transition"
            >
              User A Map
            </Link>
          </li>
          <li>
            <Link
              href="/userB"
              className="text-gray-600 hover:text-purple-600 transition"
            >
              User B Map
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

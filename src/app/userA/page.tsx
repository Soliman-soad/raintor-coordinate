"use client";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import UserAMap with no SSR to prevent window is not defined errors
const UserAMap = dynamic(() => import("@/components/maps/UserAMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">User A Map</h2>
        <div className="mt-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading map...</p>
        </div>
      </div>
    </div>
  ),
});

const index = () => {
  return <UserAMap />;
};

export default index;
// ui/SkeletonCard.tsx
export default function SkeletonCard() {
    return (
      <div className="w-full h-full p-4 bg-white rounded-md shadow animate-pulse">
        <div className="w-full h-40 bg-gray-200 rounded mb-4" />
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }
  
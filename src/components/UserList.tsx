import { useState, useEffect, useCallback } from "react";
import { useGetUsersQuery } from "../services/api";
import UserCard from "./ui/UserCard";
import SkeletonCard from "./ui/SkeletonCard";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorMessage from "./ui/ErrorMessage";
import EmptyState from "./ui/EmptyState";
import { User } from "../types/user";

const ITEMS_PER_PAGE = 10;

export default function UserList() {
  const [skip, setSkip] = useState(0);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, error, isLoading, isFetching, refetch } = useGetUsersQuery({
    take: ITEMS_PER_PAGE,
    skip,
  });

  // Update user list on data fetch
  useEffect(() => {
    if (data?.users?.length) {
      setAllUsers((prev) => {
        const newUsers = data.users.filter(
          (u) => !prev.some((p) => p.id === u.id)
        );
        return [...prev, ...newUsers];
      });

      if (skip + ITEMS_PER_PAGE >= data.total) {
        setHasMore(false);
      }
    }
  }, [data, skip]);

  // Infinite scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !isFetching &&
        hasMore
      ) {
        setSkip((prev) => prev + ITEMS_PER_PAGE);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasMore]);

  const handleRetry = useCallback(() => {
    setSkip(0);
    setAllUsers([]);
    setHasMore(true);
    refetch();
  }, [refetch]);

  if (error) {
    let msg = "Failed to load users";
    if ("data" in error && error.data)
      msg = (error.data as any)?.message || msg;
    else if ("error" in error) msg = error.error || msg;
    return <ErrorMessage message={msg} onRetry={handleRetry} />;
  }

  if (isLoading && allUsers.length === 0) {
    return <LoadingSpinner text="users" />;
  }

  if (data && data.users.length === 0 && allUsers.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Directory</h1>
        <p className="text-sm text-gray-600">
          Showing {allUsers.length} of {data?.total ?? 0} users
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {allUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {isFetching &&
          Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
            <SkeletonCard key={idx + 1} />
          ))}
      </div>

      {!hasMore && allUsers.length > 0 && (
        <div className="text-center mt-6 text-sm text-gray-500">
          You've reached the end of the user list.
        </div>
      )}
    </div>
  );
}

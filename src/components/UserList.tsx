import { useState, useCallback, useEffect } from "react";
import { useGetUsersQuery } from "../services/api";
import { useInView } from "react-intersection-observer";
import UserCard from "./ui/UserCard";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorMessage from "./ui/ErrorMessage";
import EmptyState from "./ui/EmptyState";
import { User } from "../types/user";

const ITEMS_PER_PAGE = 10;

export default function UserList() {
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const { data, error, isLoading, isFetching, refetch } = useGetUsersQuery({
    take: ITEMS_PER_PAGE,
    skip,
  });

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore && data) {
      const nextSkip = skip + ITEMS_PER_PAGE;
      if (nextSkip < data.total) {
        setSkip(nextSkip);
      } else {
        setHasMore(false);
      }
    }
  }, [isFetching, hasMore, data, skip]);

  const { ref: observerRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      loadMore();
    }
  }, [inView, hasMore, isFetching, loadMore]);

  useEffect(() => {
    if (data?.users?.length) {
      setAllUsers((prev: User[]) => {
        const newUsers = data.users.filter(
          (u) => !prev.some((p) => p.id === u.id)
        );
        return [...prev, ...newUsers];
      });
    }
  }, [data]);

  const handleRetry = useCallback(() => {
    setSkip(0);
    setHasMore(true);
    refetch();
  }, [refetch]);

  if (error) {
    let errorMessage = "Failed to load users";

    if ("data" in error && error.data) {
      errorMessage = (error.data as any)?.message || errorMessage;
    } else if ("error" in error) {
      errorMessage = error.error || errorMessage;
    }

    return <ErrorMessage message={errorMessage} onRetry={handleRetry} />;
  }

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  if (data && data.users.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          User Directory
        </h1>
        {data && (
          <p className="text-gray-600">
            Showing {allUsers.length} of {data.total} users
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {isFetching && (
        <div className="mt-8">
          <LoadingSpinner />
        </div>
      )}

      {hasMore && (
        <div
          ref={observerRef}
          className="h-4 w-full"
          aria-label="Load more users"
        />
      )}

      {!hasMore && data && data.users.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            You've reached the end of the user list
          </p>
        </div>
      )}
    </div>
  );
}

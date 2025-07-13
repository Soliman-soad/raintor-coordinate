import { BriefcaseBusiness } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center">
        <BriefcaseBusiness size={24} className="mx-auto" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No users found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          There are no users to display at the moment.
        </p>
      </div>
    </div>
  );
}

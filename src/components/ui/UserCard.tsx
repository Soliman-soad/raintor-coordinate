import { memo } from "react";
import { User } from "../../types/user";
import { BriefcaseBusiness, Mail, Phone, School } from "lucide-react";
import Image from "next/image";

interface UserCardProps {
  user: User;
}

const UserCard = memo(function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 hover:shadow-sm transition-shadow duration-200 border border-gray-100">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-shrink-0">
            <Image
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              width={64}
              height={64}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random&size=64`;
              }}
            />
          </div>
          <div className="space-y-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              ID: {user.id}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {user.firstName} {user.lastName}
            </h3>
          </div>
        </div>

        <div className="space-y-1 mb-3">
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <Mail size={16} />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <Phone size={16} />
            <span>{user.phone}</span>
          </div>

          <div className="flex gap-1 items-center text-sm text-gray-600">
            <School size={16} />
            <span className="truncate">{user.university}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <BriefcaseBusiness size={16} />
            <span className="truncate">{user.company.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserCard;

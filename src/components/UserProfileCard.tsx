import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ name, email, avatarUrl }) => {
  console.log('UserProfileCard loaded for:', name);

  // Helper to generate initials from the user's name for the avatar fallback
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1 && names[0].length > 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return names
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardContent className="p-6 flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
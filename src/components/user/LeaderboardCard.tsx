
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserLevel from './UserLevel';

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: string;
  problemsSolved: number;
}

interface LeaderboardCardProps {
  users: LeaderboardUser[];
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ users }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Top Problem Solvers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div key={user.id} className="flex items-center gap-4">
              <div className="text-xl font-bold text-muted-foreground min-w-8">
                #{index + 1}
              </div>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{user.name}</div>
                <UserLevel points={user.points} level={user.level} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-brand-purple">
                  {user.points}
                </div>
                <div className="text-xs text-muted-foreground">
                  {user.problemsSolved} problems solved
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;

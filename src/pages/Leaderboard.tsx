
import React from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import UserLevel from '@/components/user/UserLevel';

const LeaderboardPage = () => {
  const leaderboardUsers = [
    {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?u=alex',
      points: 1250,
      level: 'Expert',
      problemsSolved: 32,
      solutions: 48,
      acceptedSolutions: 29
    },
    {
      id: 'user7',
      name: 'Rahul Kumar',
      avatar: 'https://i.pravatar.cc/150?u=rahul',
      points: 980,
      level: 'Expert',
      problemsSolved: 27,
      solutions: 36,
      acceptedSolutions: 24
    },
    {
      id: 'user8',
      name: 'Emily Zhang',
      avatar: 'https://i.pravatar.cc/150?u=emily',
      points: 820,
      level: 'Problem Solver',
      problemsSolved: 19,
      solutions: 31,
      acceptedSolutions: 21
    },
    {
      id: 'user3',
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?u=michael',
      points: 740,
      level: 'Problem Solver',
      problemsSolved: 16,
      solutions: 29,
      acceptedSolutions: 19
    },
    {
      id: 'user5',
      name: 'Taylor Rodriguez',
      avatar: 'https://i.pravatar.cc/150?u=taylor',
      points: 690,
      level: 'Problem Solver',
      problemsSolved: 15,
      solutions: 28,
      acceptedSolutions: 17
    },
    {
      id: 'user9',
      name: 'David Williams',
      avatar: 'https://i.pravatar.cc/150?u=david',
      points: 580,
      level: 'Problem Solver',
      problemsSolved: 14,
      solutions: 26,
      acceptedSolutions: 15
    },
    {
      id: 'user2',
      name: 'Sarah Lee',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      points: 490,
      level: 'Problem Solver',
      problemsSolved: 12,
      solutions: 23,
      acceptedSolutions: 12
    },
    {
      id: 'user4',
      name: 'Jamie Wilson',
      avatar: 'https://i.pravatar.cc/150?u=jamie',
      points: 410,
      level: 'Problem Solver',
      problemsSolved: 10,
      solutions: 18,
      acceptedSolutions: 10
    },
    {
      id: 'user6',
      name: 'Jordan Patel',
      avatar: 'https://i.pravatar.cc/150?u=jordan',
      points: 320,
      level: 'Problem Solver',
      problemsSolved: 8,
      solutions: 15,
      acceptedSolutions: 8
    },
    {
      id: 'user10',
      name: 'Olivia Garcia',
      avatar: 'https://i.pravatar.cc/150?u=olivia',
      points: 240,
      level: 'Newbie',
      problemsSolved: 6,
      solutions: 12,
      acceptedSolutions: 6
    }
  ];

  return (
    <Layout>
      <div className="container max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <div className="text-muted-foreground">
            Updated daily
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-brand-purple">
                  <AvatarImage src={leaderboardUsers[0].avatar} alt={leaderboardUsers[0].name} />
                  <AvatarFallback className="text-3xl">{leaderboardUsers[0].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-brand-purple text-white rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 border-white">
                  1
                </div>
              </div>
              <h2 className="mt-4 text-xl font-bold">{leaderboardUsers[0].name}</h2>
              <Badge className="mt-1 bg-brand-purple">{leaderboardUsers[0].level}</Badge>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold text-brand-purple">{leaderboardUsers[0].points}</div>
                <div className="text-muted-foreground">total points</div>
              </div>
              
              <UserLevel 
                points={leaderboardUsers[0].points}
                level={leaderboardUsers[0].level}
              />
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-accent rounded-md">
                  <div className="text-2xl font-bold">{leaderboardUsers[0].problemsSolved}</div>
                  <div className="text-xs text-muted-foreground">Problems Solved</div>
                </div>
                <div className="text-center p-3 bg-accent rounded-md">
                  <div className="text-2xl font-bold">{leaderboardUsers[0].solutions}</div>
                  <div className="text-xs text-muted-foreground">Solutions</div>
                </div>
                <div className="text-center p-3 bg-accent rounded-md">
                  <div className="text-2xl font-bold">{leaderboardUsers[0].acceptedSolutions}</div>
                  <div className="text-xs text-muted-foreground">Accepted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableCaption>Top problem solvers ranked by points</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Problems Solved</TableHead>
                <TableHead className="text-right">Solutions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.level}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold">{user.points}</TableCell>
                  <TableCell className="text-right">{user.problemsSolved}</TableCell>
                  <TableCell className="text-right">{user.solutions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;

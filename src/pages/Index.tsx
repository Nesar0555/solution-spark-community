
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProblemsList from '@/components/problem/ProblemsList';
import { useProblems } from '@/hooks/useProblems';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LeaderboardUser } from '@/components/user/LeaderboardCard';
import LeaderboardCard from '@/components/user/LeaderboardCard';

const IndexPage = () => {
  const { problems, isLoading } = useProblems();
  const [activeTab, setActiveTab] = useState('recent');
  
  // Mock leaderboard data
  const leaderboardUsers: LeaderboardUser[] = [
    {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?u=alex',
      points: 1250,
      level: 'Expert',
      problemsSolved: 32
    },
    {
      id: 'user7',
      name: 'Rahul Kumar',
      avatar: 'https://i.pravatar.cc/150?u=rahul',
      points: 980,
      level: 'Expert',
      problemsSolved: 27
    },
    {
      id: 'user8',
      name: 'Emily Zhang',
      avatar: 'https://i.pravatar.cc/150?u=emily',
      points: 820,
      level: 'Problem Solver',
      problemsSolved: 19
    },
    {
      id: 'user3',
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?u=michael',
      points: 740,
      level: 'Problem Solver',
      problemsSolved: 16
    },
    {
      id: 'user5',
      name: 'Taylor Rodriguez',
      avatar: 'https://i.pravatar.cc/150?u=taylor',
      points: 690,
      level: 'Problem Solver',
      problemsSolved: 15
    }
  ];

  // Filter problems based on the active tab
  const filteredProblems = problems.filter(problem => {
    if (activeTab === 'recent') return true;
    if (activeTab === 'trending') return problem.votes > 20;
    if (activeTab === 'unsolved') return problem.status === 'open';
    return true;
  });
  
  // Sort problems based on the active tab
  const sortedProblems = [...filteredProblems].sort((a, b) => {
    if (activeTab === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (activeTab === 'trending') {
      return b.votes - a.votes;
    }
    return 0;
  });

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Discover Problems</h1>
            <Button className="bg-brand-purple hover:bg-brand-purple-dark">
              Post a Problem
            </Button>
          </div>
          
          <div className="mb-6">
            <Tabs defaultValue="recent" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="unsolved">Unsolved</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="ideas">Ideas</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value="recent">
                <ProblemsList problems={sortedProblems} isLoading={isLoading} />
              </TabsContent>
              <TabsContent value="trending">
                <ProblemsList problems={sortedProblems} isLoading={isLoading} />
              </TabsContent>
              <TabsContent value="unsolved">
                <ProblemsList problems={sortedProblems} isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="lg:w-1/4">
          <LeaderboardCard users={leaderboardUsers} />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

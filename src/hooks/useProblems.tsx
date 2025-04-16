
import { useEffect, useState } from 'react';

export interface Problem {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  userAvatar: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  urgencyLevel: 'low' | 'medium' | 'high';
  status: 'open' | 'solved';
  votes: number;
  viewCount: number;
  solutionCount: number;
}

export interface Solution {
  id: string;
  problemId: string;
  content: string;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
  votes: number;
  accepted: boolean;
}

export const useProblems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        // In a real app, we would fetch from an API
        // For now, we'll use mock data
        const mockProblems: Problem[] = [
          {
            id: '1',
            title: 'How to optimize React component re-rendering?',
            description: 'I have a complex React component that re-renders too often. I\'ve tried using React.memo but still having performance issues. What are some strategies to optimize this?',
            userId: 'user2',
            userName: 'Sarah Lee',
            userAvatar: 'https://i.pravatar.cc/150?u=sarah',
            category: 'Technology',
            tags: ['React', 'Performance', 'Frontend'],
            createdAt: '2025-04-12T10:30:00Z',
            updatedAt: '2025-04-12T10:30:00Z',
            urgencyLevel: 'medium',
            status: 'open',
            votes: 24,
            viewCount: 142,
            solutionCount: 5
          },
          {
            id: '2',
            title: 'Business model validation for edutech startup',
            description: 'I\'m developing an educational technology startup focused on personalized learning. How can I validate my business model before seeking investment?',
            userId: 'user3',
            userName: 'Michael Chen',
            userAvatar: 'https://i.pravatar.cc/150?u=michael',
            category: 'Business',
            tags: ['Startup', 'Edutech', 'Business Model'],
            createdAt: '2025-04-13T08:15:00Z',
            updatedAt: '2025-04-13T14:20:00Z',
            urgencyLevel: 'high',
            status: 'open',
            votes: 18,
            viewCount: 97,
            solutionCount: 3
          },
          {
            id: '3',
            title: 'Improving study techniques for final exams',
            description: 'I have finals coming up in three weeks and I\'m struggling with effective study techniques. What methods work best for retaining large amounts of information?',
            userId: 'user4',
            userName: 'Jamie Wilson',
            userAvatar: 'https://i.pravatar.cc/150?u=jamie',
            category: 'Education',
            tags: ['Study Skills', 'Exams', 'Memory'],
            createdAt: '2025-04-14T16:45:00Z',
            updatedAt: '2025-04-14T16:45:00Z',
            urgencyLevel: 'high',
            status: 'open',
            votes: 31,
            viewCount: 203,
            solutionCount: 8
          },
          {
            id: '4',
            title: 'Managing anxiety before public speaking',
            description: 'I have to give a presentation at a conference next month and I\'m experiencing severe anxiety about speaking in public. What strategies can help manage this anxiety?',
            userId: 'user5',
            userName: 'Taylor Rodriguez',
            userAvatar: 'https://i.pravatar.cc/150?u=taylor',
            category: 'Health',
            tags: ['Mental Health', 'Anxiety', 'Public Speaking'],
            createdAt: '2025-04-10T09:20:00Z',
            updatedAt: '2025-04-11T11:35:00Z',
            urgencyLevel: 'medium',
            status: 'solved',
            votes: 45,
            viewCount: 289,
            solutionCount: 12
          },
          {
            id: '5',
            title: 'Structuring a Node.js API for scalability',
            description: 'I\'m building a Node.js API that I expect to handle significant traffic growth. What\'s the best way to structure it for scalability and maintainability?',
            userId: 'user6',
            userName: 'Jordan Patel',
            userAvatar: 'https://i.pravatar.cc/150?u=jordan',
            category: 'Technology',
            tags: ['Node.js', 'API', 'Scalability', 'Backend'],
            createdAt: '2025-04-15T13:10:00Z',
            updatedAt: '2025-04-15T13:10:00Z',
            urgencyLevel: 'low',
            status: 'open',
            votes: 29,
            viewCount: 176,
            solutionCount: 6
          }
        ];
        
        setProblems(mockProblems);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch problems');
        setIsLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const getSolutions = async (problemId: string): Promise<Solution[]> => {
    // In a real app, we would fetch from an API
    // For now, we'll use mock data
    const mockSolutions: Solution[] = [
      {
        id: 's1',
        problemId: '1',
        content: 'You should consider using React.useMemo for expensive calculations and useCallback for function references. Also, check if you can move state further down the component tree to prevent unnecessary re-renders of parent components.',
        userId: 'user7',
        userName: 'Rahul Kumar',
        userAvatar: 'https://i.pravatar.cc/150?u=rahul',
        createdAt: '2025-04-12T11:45:00Z',
        votes: 15,
        accepted: false
      },
      {
        id: 's2',
        problemId: '1',
        content: 'One approach is to use the React DevTools Profiler to identify which components are re-rendering unnecessarily. Once identified, you can implement shouldComponentUpdate (for class components) or React.memo with a custom comparison function (for functional components).',
        userId: 'user8',
        userName: 'Emily Zhang',
        userAvatar: 'https://i.pravatar.cc/150?u=emily',
        createdAt: '2025-04-12T12:30:00Z',
        votes: 21,
        accepted: false
      },
      {
        id: 's3',
        problemId: '2',
        content: 'For edutech startups, I recommend creating a minimal viable product (MVP) and testing it with a small group of target users. Collect qualitative feedback and usage metrics to validate your assumptions. Also, consider running small paid pilots with schools or educational institutions to prove willingness to pay.',
        userId: 'user9',
        userName: 'David Williams',
        userAvatar: 'https://i.pravatar.cc/150?u=david',
        createdAt: '2025-04-13T10:20:00Z',
        votes: 12,
        accepted: true
      }
    ];
    
    return mockSolutions.filter(solution => solution.problemId === problemId);
  };

  const addProblem = (problem: Omit<Problem, 'id' | 'createdAt' | 'updatedAt' | 'votes' | 'viewCount' | 'solutionCount'>) => {
    const newProblem: Problem = {
      ...problem,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      votes: 0,
      viewCount: 0,
      solutionCount: 0
    };
    
    setProblems(prev => [newProblem, ...prev]);
    return newProblem;
  };

  const addSolution = async (solution: Omit<Solution, 'id' | 'createdAt' | 'votes' | 'accepted'>) => {
    // In a real app, we would send this to an API
    // For now, we'll just update the local solution count
    setProblems(prev => 
      prev.map(problem => 
        problem.id === solution.problemId
          ? { ...problem, solutionCount: problem.solutionCount + 1 }
          : problem
      )
    );
    
    return {
      ...solution,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      votes: 0,
      accepted: false
    };
  };

  return {
    problems,
    isLoading,
    error,
    getSolutions,
    addProblem,
    addSolution
  };
};


import React from 'react';
import { Problem } from '@/hooks/useProblems';
import ProblemCard from './ProblemCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ProblemsListProps {
  problems: Problem[];
  isLoading: boolean;
}

const ProblemsList: React.FC<ProblemsListProps> = ({ problems, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium">No problems found</h3>
        <p className="text-muted-foreground mt-2">Be the first to post a problem!</p>
      </div>
    );
  }

  return (
    <div>
      {problems.map(problem => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
};

export default ProblemsList;

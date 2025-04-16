
import React from 'react';
import { Solution } from '@/hooks/useProblems';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface SolutionCardProps {
  solution: Solution;
  onAccept?: (id: string) => void;
  canAccept: boolean;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ 
  solution, 
  onAccept, 
  canAccept 
}) => {
  return (
    <Card className={cn(
      "mb-4 overflow-hidden transition-all duration-200",
      solution.accepted && "border-brand-purple border-2"
    )}>
      {solution.accepted && (
        <div className="bg-brand-purple text-white text-center py-1 text-sm font-medium">
          Accepted Solution
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex flex-col items-center pt-2">
            <ArrowUp className="h-5 w-5 cursor-pointer hover:text-brand-purple" />
            <span className="font-bold my-1">{solution.votes}</span>
            <ArrowDown className="h-5 w-5 cursor-pointer hover:text-destructive" />
            {solution.accepted && (
              <CheckCircle className="h-5 w-5 text-brand-purple mt-4" />
            )}
          </div>
          <div className="flex-1">
            <p className="whitespace-pre-line">{solution.content}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={solution.userAvatar} alt={solution.userName} />
            <AvatarFallback>{solution.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground text-sm">
            {solution.userName} • {formatDistanceToNow(new Date(solution.createdAt), { addSuffix: true })}
          </span>
        </div>
        {canAccept && !solution.accepted && (
          <Button
            size="sm"
            variant="outline"
            className="text-brand-purple border-brand-purple hover:bg-brand-purple hover:text-white"
            onClick={() => onAccept && onAccept(solution.id)}
          >
            Accept Solution
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SolutionCard;

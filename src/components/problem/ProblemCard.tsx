
import React from 'react';
import { Link } from 'react-router-dom';
import { Problem } from '@/hooks/useProblems';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
        <div className="flex-1">
          <Link to={`/problem/${problem.id}`} className="text-lg font-medium hover:text-brand-purple transition-colors">
            {problem.title}
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="capitalize">
              {problem.category}
            </Badge>
            {problem.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            <Badge 
              className={cn(
                "ml-auto",
                problem.urgencyLevel === 'high' ? "bg-red-500" : 
                problem.urgencyLevel === 'medium' ? "bg-yellow-500" : 
                "bg-green-500"
              )}
            >
              {problem.urgencyLevel}
            </Badge>
            {problem.status === 'solved' && (
              <Badge className="bg-brand-purple">Solved</Badge>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center bg-accent p-2 rounded-md min-w-16 text-center">
          <ArrowUp className="h-4 w-4 cursor-pointer hover:text-brand-purple" />
          <span className="font-bold">{problem.votes}</span>
          <ArrowDown className="h-4 w-4 cursor-pointer hover:text-destructive" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-muted-foreground line-clamp-2">
          {problem.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={problem.userAvatar} alt={problem.userName} />
            <AvatarFallback>{problem.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground">
            {problem.userName} • {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })}
          </span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            {problem.solutionCount}
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {problem.viewCount}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;


import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useProblems, Solution, Problem } from '@/hooks/useProblems';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, ArrowUp, ArrowDown, MessageSquare, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import SolutionCard from '@/components/solution/SolutionCard';
import SolutionForm from '@/components/solution/SolutionForm';
import { Skeleton } from '@/components/ui/skeleton';

const ProblemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { problems, getSolutions, addSolution } = useProblems();
  const { user } = useAuth();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      const foundProblem = problems.find(p => p.id === id) || null;
      setProblem(foundProblem);
      
      if (foundProblem) {
        const problemSolutions = await getSolutions(id);
        setSolutions(problemSolutions);
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, [id, problems, getSolutions]);

  const handleSolutionSubmit = async (content: string) => {
    if (!user || !problem) return;
    
    setIsSubmitting(true);
    
    try {
      const newSolution = await addSolution({
        problemId: problem.id,
        content,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar
      });
      
      setSolutions(prev => [...prev, newSolution]);
    } catch (error) {
      console.error("Failed to submit solution:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAcceptSolution = (solutionId: string) => {
    // In a real app, we would call an API here
    setSolutions(prev => 
      prev.map(solution => ({
        ...solution,
        accepted: solution.id === solutionId
      }))
    );
    
    // Also update the problem status
    if (problem) {
      setProblem({
        ...problem,
        status: 'solved'
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-4" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="space-y-4">
            {[1, 2].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!problem) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-10">
          <h1 className="text-2xl font-bold mb-2">Problem not found</h1>
          <p className="text-muted-foreground mb-6">
            The problem you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to problems
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Button variant="ghost" asChild className="pl-0 mb-2">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to problems
            </Link>
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="p-6 pb-0 flex flex-row justify-between items-start">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="capitalize">
                  {problem.category}
                </Badge>
                {problem.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                <Badge 
                  className={cn(
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
            <div className="flex flex-col items-center bg-accent p-3 rounded-md min-w-16 text-center">
              <ArrowUp className="h-5 w-5 cursor-pointer hover:text-brand-purple" />
              <span className="font-bold text-lg my-1">{problem.votes}</span>
              <ArrowDown className="h-5 w-5 cursor-pointer hover:text-destructive" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="whitespace-pre-line">{problem.description}</p>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={problem.userAvatar} alt={problem.userName} />
                <AvatarFallback>{problem.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{problem.userName}</div>
                <div className="text-sm text-muted-foreground">
                  Posted {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })}
                </div>
              </div>
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
        
        <h2 className="text-xl font-bold mb-4">
          {solutions.length} {solutions.length === 1 ? 'Solution' : 'Solutions'}
        </h2>
        
        {solutions.length > 0 ? (
          <div className="mb-6">
            {solutions.map(solution => (
              <SolutionCard 
                key={solution.id} 
                solution={solution} 
                onAccept={handleAcceptSolution}
                canAccept={!!user && user.id === problem.userId && problem.status === 'open'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-accent rounded-md mb-6">
            <p className="text-lg font-medium">No solutions yet</p>
            <p className="text-muted-foreground">Be the first to help solve this problem!</p>
          </div>
        )}
        
        <SolutionForm 
          problemId={problem.id} 
          onSubmit={handleSolutionSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </Layout>
  );
};

export default ProblemDetailPage;

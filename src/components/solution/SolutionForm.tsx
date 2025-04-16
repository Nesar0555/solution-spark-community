
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';

interface SolutionFormProps {
  problemId: string;
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
}

const SolutionForm: React.FC<SolutionFormProps> = ({ 
  problemId, 
  onSubmit,
  isSubmitting = false
}) => {
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    onSubmit(content);
    setContent('');
  };

  if (!user) {
    return (
      <div className="bg-accent p-4 rounded-md text-center my-4">
        <p className="font-medium">Sign in to submit a solution</p>
        <p className="text-sm text-muted-foreground mt-1">
          Join SolveHub to help solve problems and earn points
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 mb-4">
      <h3 className="text-lg font-medium mb-3">Your Solution</h3>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your expertise and help solve this problem..."
        className="min-h-32"
      />
      <div className="flex justify-end mt-3">
        <Button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="bg-brand-purple hover:bg-brand-purple-dark"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Solution'}
        </Button>
      </div>
    </form>
  );
};

export default SolutionForm;

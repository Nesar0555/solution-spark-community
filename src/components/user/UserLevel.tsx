
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface UserLevelProps {
  points: number;
  level: string;
  className?: string;
}

const UserLevel: React.FC<UserLevelProps> = ({ points, level, className }) => {
  // Define level thresholds
  const levelThresholds = {
    'Newbie': 0,
    'Problem Solver': 100,
    'Expert': 500,
    'Master': 1000,
    'Guru': 2000
  };
  
  // Calculate current level progress percentage
  const getProgressPercentage = () => {
    const levels = Object.entries(levelThresholds);
    const currentLevelIndex = levels.findIndex(([name]) => name === level);
    
    if (currentLevelIndex === levels.length - 1) {
      // Already at highest level
      return 100;
    }
    
    const currentLevelPoints = levels[currentLevelIndex][1] as number;
    const nextLevelPoints = levels[currentLevelIndex + 1][1] as number;
    const pointsForNextLevel = nextLevelPoints - currentLevelPoints;
    const pointsEarnedInCurrentLevel = points - currentLevelPoints;
    
    return Math.min(Math.round((pointsEarnedInCurrentLevel / pointsForNextLevel) * 100), 100);
  };
  
  const nextLevel = () => {
    const levels = Object.keys(levelThresholds);
    const currentLevelIndex = levels.findIndex(name => name === level);
    return currentLevelIndex < levels.length - 1 ? levels[currentLevelIndex + 1] : null;
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-medium">{level}</span>
          <span className="text-sm text-muted-foreground ml-2">{points} points</span>
        </div>
        {nextLevel() && (
          <span className="text-xs text-muted-foreground">
            Next: {nextLevel()}
          </span>
        )}
      </div>
      <Progress value={getProgressPercentage()} className="h-2" indicatorClassName="bg-brand-purple" />
    </div>
  );
};

export default UserLevel;

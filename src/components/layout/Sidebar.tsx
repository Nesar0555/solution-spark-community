
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Zap, 
  Award, 
  Layers, 
  HelpCircle, 
  Settings,
  Code,
  GraduationCap,
  Heart,
  Briefcase,
  Lightbulb,
  Users
} from 'lucide-react';

const categories = [
  { name: 'Technology', icon: <Code className="mr-2 h-4 w-4" /> },
  { name: 'Education', icon: <GraduationCap className="mr-2 h-4 w-4" /> },
  { name: 'Health', icon: <Heart className="mr-2 h-4 w-4" /> },
  { name: 'Business', icon: <Briefcase className="mr-2 h-4 w-4" /> },
  { name: 'Ideas', icon: <Lightbulb className="mr-2 h-4 w-4" /> },
  { name: 'Social', icon: <Users className="mr-2 h-4 w-4" /> },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="hidden lg:block pb-12 border-r">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Button className="w-full justify-start bg-brand-purple hover:bg-brand-purple-dark">
            <Zap className="mr-2 h-4 w-4" />
            Post a Problem
          </Button>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button
              variant={location.pathname === '/' ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Feed
              </Link>
            </Button>
            <Button
              variant={location.pathname === '/trending' ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/trending">
                <Zap className="mr-2 h-4 w-4" />
                Trending
              </Link>
            </Button>
            <Button
              variant={location.pathname === '/leaderboard' ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/leaderboard">
                <Award className="mr-2 h-4 w-4" />
                Leaderboard
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <Link to={`/category/${category.name.toLowerCase()}`}>
                  {category.icon}
                  {category.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Help & Settings
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help Center
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

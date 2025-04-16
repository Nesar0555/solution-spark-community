
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  HomeIcon,
  TrendingUp,
  Award,
  PlusCircle,
  BarChart2,
  Settings,
  HelpCircle,
  User,
  LogOut,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";

const MenuBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="px-4 py-2 border-b sticky top-0 bg-background z-10 flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <MoreVertical className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background w-56">
          {/* Discover Section */}
          <DropdownMenuItem onClick={() => handleMenuItemClick("/")} className="flex items-center gap-2 cursor-pointer">
            <HomeIcon className="h-4 w-4" />
            <span>Home</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("/trending")} className="flex items-center gap-2 cursor-pointer">
            <TrendingUp className="h-4 w-4" />
            <span>Trending</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("/leaderboard")} className="flex items-center gap-2 cursor-pointer">
            <Award className="h-4 w-4" />
            <span>Leaderboard</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Problems Section */}
          <DropdownMenuItem onClick={() => handleMenuItemClick("/post-problem")} className="flex items-center gap-2 cursor-pointer">
            <PlusCircle className="h-4 w-4" />
            <span>Post a Problem</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("/my-problems")} className="flex items-center gap-2 cursor-pointer">
            <BarChart2 className="h-4 w-4" />
            <span>My Problems</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Help Section */}
          <DropdownMenuItem onClick={() => handleMenuItemClick("/help")} className="flex items-center gap-2 cursor-pointer">
            <HelpCircle className="h-4 w-4" />
            <span>Help Center</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("/settings")} className="flex items-center gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Account Section */}
          {user ? (
            <>
              <DropdownMenuItem onClick={() => handleMenuItemClick("/profile")} className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onClick={() => handleMenuItemClick("/login")} className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>Login</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MenuBar;

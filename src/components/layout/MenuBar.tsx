
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { 
  HomeIcon,
  TrendingUp,
  Award,
  PlusCircle,
  BarChart2,
  Settings,
  HelpCircle,
  User,
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const MenuBar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="px-4 py-2 border-b">
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger className="font-medium">Discover</MenubarTrigger>
          <MenubarContent className="bg-background">
            <MenubarItem asChild>
              <Link to="/" className="flex items-center gap-2">
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link to="/trending" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link to="/leaderboard" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Leaderboard</span>
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger className="font-medium">Problems</MenubarTrigger>
          <MenubarContent className="bg-background">
            <MenubarItem asChild>
              <Link to="/post-problem" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Post a Problem</span>
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link to="/my-problems" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>My Problems</span>
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger className="font-medium">Help</MenubarTrigger>
          <MenubarContent className="bg-background">
            <MenubarItem asChild>
              <Link to="/help" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Help Center</span>
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link to="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        {user && (
          <MenubarMenu>
            <MenubarTrigger className="font-medium">Account</MenubarTrigger>
            <MenubarContent className="bg-background">
              <MenubarItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={logout} className="flex items-center gap-2 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        )}
      </Menubar>
    </div>
  );
};

export default MenuBar;

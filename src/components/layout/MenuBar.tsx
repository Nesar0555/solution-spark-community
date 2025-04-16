
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className="px-4 py-2 border-b sticky top-0 bg-background z-10">
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger className="font-medium">Discover</MenubarTrigger>
          <MenubarContent className="bg-background">
            <MenubarItem asChild>
              <Link to="/" className="flex items-center gap-2 w-full">
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </MenubarItem>
            <MenubarItem onClick={() => handleMenuItemClick("/trending")} className="flex items-center gap-2 cursor-pointer">
              <TrendingUp className="h-4 w-4" />
              <span>Trending</span>
            </MenubarItem>
            <MenubarItem onClick={() => handleMenuItemClick("/leaderboard")} className="flex items-center gap-2 cursor-pointer">
              <Award className="h-4 w-4" />
              <span>Leaderboard</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger className="font-medium">Problems</MenubarTrigger>
          <MenubarContent className="bg-background">
            <MenubarItem onClick={() => handleMenuItemClick("/post-problem")} className="flex items-center gap-2 cursor-pointer">
              <PlusCircle className="h-4 w-4" />
              <span>Post a Problem</span>
            </MenubarItem>
            <MenubarItem onClick={() => handleMenuItemClick("/my-problems")} className="flex items-center gap-2 cursor-pointer">
              <BarChart2 className="h-4 w-4" />
              <span>My Problems</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger className="font-medium">Help</MenubarTrigger>
          <MenubarContent className="bg-background">
            <MenubarItem onClick={() => handleMenuItemClick("/help")} className="flex items-center gap-2 cursor-pointer">
              <HelpCircle className="h-4 w-4" />
              <span>Help Center</span>
            </MenubarItem>
            <MenubarItem onClick={() => handleMenuItemClick("/settings")} className="flex items-center gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        {user ? (
          <MenubarMenu>
            <MenubarTrigger className="font-medium">Account</MenubarTrigger>
            <MenubarContent className="bg-background">
              <MenubarItem onClick={() => handleMenuItemClick("/profile")} className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        ) : (
          <MenubarMenu>
            <MenubarTrigger className="font-medium">Account</MenubarTrigger>
            <MenubarContent className="bg-background">
              <MenubarItem onClick={() => handleMenuItemClick("/login")} className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Login</span>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        )}
      </Menubar>
    </div>
  );
};

export default MenuBar;

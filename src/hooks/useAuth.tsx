
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  level: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for saved auth state
    const savedUser = localStorage.getItem('solvehub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async () => {
    // Simulate login - in a real app, this would be an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: "user1",
          name: "Alex Johnson",
          email: "alex@example.com",
          avatar: "https://i.pravatar.cc/150?u=alex",
          points: 450,
          level: "Problem Solver",
          createdAt: new Date().toISOString()
        };
        
        setUser(mockUser);
        localStorage.setItem('solvehub_user', JSON.stringify(mockUser));
        resolve();
      }, 1000); // Simulating network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('solvehub_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

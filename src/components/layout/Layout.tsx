
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MenuBar from './MenuBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <MenuBar />
      <div className="flex-1 flex">
        <div className="hidden lg:block w-64">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

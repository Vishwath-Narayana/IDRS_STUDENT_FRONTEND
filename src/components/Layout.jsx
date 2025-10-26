import React from 'react';
import Header from './Header';
import SideNav from './SideNav';
import { Outlet } from 'react-router-dom';

const Layout = ({children}) => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <Header />
      <SideNav />

      {/* Main Content Area */}
      <main className="ml-72 mt-16 p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;

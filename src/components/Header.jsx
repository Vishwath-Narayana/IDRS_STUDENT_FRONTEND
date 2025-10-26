import React from 'react';
import { Search, Bell, Settings, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

function Header() {
  const loggedInUser = localStorage.getItem('user') || 'Student';
  
  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-40 flex items-center justify-between px-8 animate-slide-in-right">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-20 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-all duration-200"
          />
          <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 rounded shadow-sm">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section - Icons and Profile */}
      <div className="flex items-center gap-2 ml-8">
        {/* Icon Buttons */}
        <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <HelpCircle className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <Settings className="w-4 h-4" />
        </Button>

        {/* Divider */}
        <Separator orientation="vertical" className="h-8 mx-2" />

        {/* User Profile */}
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-semibold text-xs shadow-sm group-hover:shadow-md transition-all">
            {loggedInUser.substring(0, 2).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-900">{loggedInUser}</p>
            <p className="text-[10px] text-gray-500 font-medium">Student</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

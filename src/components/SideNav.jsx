import React, { useState } from "react";
import { useAlert } from "./AlertContext";
import {
  Home,
  BookOpen,
  FolderOpen,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  HelpCircle,
  Users,
  UserCog,
  CalendarCheck,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const SideNav = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [isNavigateOpen, setIsNavigateOpen] = useState(true);
  const [isMoreOpen, setIsMoreOpen] = useState(true);
  const loggedInUser = localStorage.getItem('user') || 'Student';

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("email");
      showAlert("Logged out successfully", "success");
      navigate("/");
    } catch (err) {
      showAlert("Logout failed. Please try again.", "error");
    }
  };

  const handleSwitchAccount = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("email");
      showAlert("Switching account...", "success");
      navigate("/");
    } catch (err) {
      showAlert("Failed to switch account. Please try again.", "error");
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      name: "Syllabus & Units",
      icon: <BookOpen className="w-5 h-5" />,
      path: "/syllabus",
    },
    {
      name: "Attendance",
      icon: <CalendarCheck className="w-5 h-5" />,
      path: "/attendance",
    },
    {
      name: "Logs & Reports",
      icon: <FolderOpen className="w-5 h-5" />,
      path: "/logs",
    },
    { 
      name: "Notices", 
      icon: <Bell className="w-5 h-5" />, 
      path: "/notices" 
    },
    { 
      name: "Association Activities", 
      icon: <Users className="w-5 h-5" />, 
      path: "/association" 
    },
  ];

  const bottomItems = [
    {
      name: "Help & Support",
      icon: <HelpCircle className="w-5 h-5" />,
      path: "/support",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/settings",
    },
  ];

  return (
    <div className="w-72 h-screen fixed top-0 left-0 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-gray-800 flex flex-col animate-slide-in-left transition-colors z-40">
      {/* Logo / Brand */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
            <GraduationCap className="w-4 h-4 text-white dark:text-gray-900" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 tracking-tight">IDRS Student</h2>
            <p className="text-[9px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Academic Portal</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {/* Navigate Section */}
        <div className="mb-2">
          <button
            onClick={() => setIsNavigateOpen(!isNavigateOpen)}
            className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 uppercase tracking-wider transition-colors"
          >
            <span>Navigate</span>
            {isNavigateOpen ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
          
          {isNavigateOpen && (
            <nav className="flex flex-col gap-0.5 mt-1">
              {navItems.map(({ name, icon, path }) => (
                <NavLink
                  key={name}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-100 active:scale-[0.98]"
                    }`
                  }
                >
                  {icon}
                  <span>{name}</span>
                </NavLink>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Bottom Section - Settings, Support & Logout */}
      <div className="border-t border-gray-100 dark:border-gray-800 px-3 py-1.5 space-y-0.5">
        {bottomItems.map(({ name, icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-100 active:scale-[0.98]"
              }`
            }
          >
            {icon}
            <span>{name}</span>
          </NavLink>
        ))}
        
        <Separator className="my-1 dark:bg-gray-800" />
        
        <Button
          onClick={handleSwitchAccount}
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800 active:scale-[0.98] h-8 px-3"
        >
          <UserCog className="w-4 h-4" />
          <span className="text-sm">Switch Account</span>
        </Button>
        
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2.5 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950 active:scale-[0.98] h-8 px-3"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default SideNav;

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  ChevronLeft, ChevronRight, LayoutDashboard, Users, BarChart3, 
  Settings, LogOut, Bell, Search, Menu, X, Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/Logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { getApiUrl } from '@/lib/api';

const sidebarItems = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { name: "Leads", path: "/dashboard/leads", icon: <Users className="h-5 w-5" /> },
  { name: "Campaigns", path: "/dashboard/campaigns", icon: <Briefcase className="h-5 w-5" /> },
  { name: "Analytics", path: "/dashboard/analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { name: "Settings", path: "/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) return;
      try {
        const res = await fetch(getApiUrl("/api/auth/profile"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUserName(data.name || "User");
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-role");
    navigate("/auth/login");
  };

  const sidebarWidth = collapsed ? "w-20" : "w-64";
  
  const renderSidebar = () => (
    <aside 
      className={cn(
        "fixed left-0 top-0 bottom-0 bg-sidebar border-r border-slate-200 dark:border-slate-700 z-30 transition-all duration-300 ease-in-out",
        sidebarWidth,
        isMobile && !mobileMenuOpen && "hidden"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-4">
          {collapsed ? (
            <div className="w-full flex justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="8" fill="#4F46E5" />
                <path
                  d="M21.3334 14.6667L16.0001 10.6667L10.6667 14.6667V21.3333H21.3334V14.6667Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 22.6667V16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 10.6667L8 16.0001L16 21.3334L24 16.0001L16 10.6667Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <Logo />
          )}
        </div>

        <div className="mt-6 flex-1 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  className={cn(
                    "flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  )}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setMobileMenuOpen(false);
                  }}
                >
                  <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
                    {item.icon}
                    {!collapsed && <span className="ml-3">{item.name}</span>}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Button 
            variant="ghost" 
            className={cn("w-full justify-start", collapsed && "justify-center")}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>

        {!isMobile && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <Button
              variant="ghost"
              size="icon"
              className={cn("w-full", collapsed ? "justify-center" : "justify-end")}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {renderSidebar()}

      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          isMobile ? "ml-0" : collapsed ? "ml-20" : "ml-64"
        )}
      >
        <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 lg:px-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}

          <div className={cn("flex-1 flex", isMobile ? "justify-center" : "ml-4")}>
            <div className="max-w-lg w-full lg:max-w-sm">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-60 overflow-y-auto">
                  <div className="p-4 text-sm">
                    <p className="text-gray-500 dark:text-gray-400 text-center">No new notifications</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center gap-2 h-8 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>{userName ? userName[0] : "U"}</AvatarFallback>
                  </Avatar>
                  {!isMobile && <span className="font-medium text-sm">{userName || "User"}</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </main>

        <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} LeadInsight. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;

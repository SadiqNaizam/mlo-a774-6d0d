import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Settings, LayoutDashboard, LockKeyhole } from 'lucide-react';

const Header: React.FC = () => {
  // NOTE: This is a mock authentication state for demonstration.
  // In a real app, this would be managed by a context or state management library.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log('Header loaded');

  const handleLogout = () => {
    setIsLoggedIn(false);
    // In a real app, you'd also clear tokens, etc.
  };

  const activeLinkClass = "text-primary font-semibold";
  const inactiveLinkClass = "text-muted-foreground transition-colors hover:text-primary";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2">
            <LockKeyhole className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">AccessPoint</span>
          </Link>
          {isLoggedIn && (
            <nav className="hidden md:flex items-center gap-4 text-sm">
               <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
              >
                Dashboard
              </NavLink>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* This button is for demo purposes to toggle the auth state */}
          <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(!isLoggedIn)}>
            Toggle Auth
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    {/* In a real app, you'd fetch the user's avatar image */}
                    <AvatarImage src="/avatars/01.png" alt="@user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile-settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} asChild>
                   <Link to="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Timer, Home, Users, MessageCircle, Search, User, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  // Hide navbar on login and landing pages
  if (location.pathname === '/login' || location.pathname === '/') {
    return null;
  }

  const navItems = [
    {
      to: '/home',
      icon: Home,
      label: 'Home'
    },
    {
      to: '/friends',
      icon: Users,
      label: 'Friends'
    },
    {
      to: '/search',
      icon: Search,
      label: 'Search'
    },
    {
      to: '/gossip',
      icon: MessageSquare,
      label: 'Gossip'
    },
    {
      to: '/messenger',
      icon: MessageCircle,
      label: 'Messages'
    },
    {
      to: '/profile',
      icon: User,
      label: 'Profile'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-glass border-t border-border md:hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
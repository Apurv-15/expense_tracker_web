import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '../../Ui/button';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../../lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Insights', path: '/insights' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/30 dark:bg-black/50 dark:border-gray-800/30' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="font-medium text-xl tracking-tight"
        >
          <span className="text-2xl text-white font-bold">FlowTrack</span>
          <span className="text-blue-500 font-bold">.</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                location.pathname === link.path
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <Button 
            className="flex items-center justify-center h-10 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium transition-all hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../../Ui/button';
import { cn } from '../../lib/utils';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

        {/* Desktop Navigation */}
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
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {!isAuthenticated && (
            <Button onClick={() => loginWithRedirect({
              redirect_uri: window.location.origin,appState:{targetUrl:"/dashboard"}
            })}
              className="flex items-center justify-center h-10 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium transition-all hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Get Started
            </Button>
          )}
          {isAuthenticated && (
            <Button onClick={logout}
              className="flex items-center justify-center h-10 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium transition-all hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Logout
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-50">
            <div className="fixed right-0 top-0 w-full max-w-sm h-full bg-white dark:bg-black/50 shadow-lg transform transition-transform duration-300 ease-in-out" style={{ transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}>
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200',
                        location.pathname === link.path
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

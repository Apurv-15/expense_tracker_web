
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
    
    // Set theme based on localStorage or system preference if not set yet
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setIsDark(!isDark);
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="relative overflow-hidden transition-all duration-500 ease-out hover:bg-background hover:text-primary focus-visible:ring-0 focus-visible:ring-offset-0"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-500 rotate-0 scale-100 ${isDark ? 'scale-0 rotate-90' : ''}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 rotate-90 scale-0 ${isDark ? 'scale-100 rotate-0' : ''}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

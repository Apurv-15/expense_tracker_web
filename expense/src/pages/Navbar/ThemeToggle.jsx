import { Moon, Sun } from "lucide-react";
import { useTheme } from "./Themeprovider";
import { Toggle } from "./Toogle";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Check if dark mode is active (either explicitly dark or system dark)
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Toggle
      variant="outline"
      size="sm"
      pressed={isDark}
      onPressedChange={(pressed) => {
        if (pressed) {
          setTheme('dark');
        } else {
          setTheme('light');
        }
      }}
      aria-label="Toggle theme"
      className="rounded-full w-9 p-0"
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-blue-400" />
      ) : (
        <Sun className="h-4 w-4 text-yellow-500" />
      )}
    </Toggle>
  );
}
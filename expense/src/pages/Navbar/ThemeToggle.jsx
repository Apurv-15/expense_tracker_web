import { Moon, Sun } from "lucide-react";
import { useTheme } from "./Themeprovider";
import { Toggle } from "./Toogle";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      variant="outline"
      size="sm"
      pressed={theme === "dark"}
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
      aria-label="Toggle theme"
      className="rounded-full w-9 p-0"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-blue-400" />
      ) : (
        <Sun className="h-4 w-4 text-yellow-500" />
      )}
    </Toggle>
  );
}

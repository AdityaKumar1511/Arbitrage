"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function NavbarActions() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-lg bg-gray-100/50 dark:bg-zinc-800/50 animate-pulse" />
        <div className="w-28 h-9 rounded-lg bg-gray-100/50 dark:bg-zinc-800/50 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
        aria-label="Toggle Theme"
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5 transition-all duration-300 hover:rotate-[-12deg]" />
        ) : (
          <Sun className="w-5 h-5 transition-all duration-300 text-orange-400 hover:rotate-[45deg]" />
        )}
      </button>

      {/* Sign In Button */}
      <Button
        className="group relative bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 hover:from-orange-400 hover:to-orange-500 dark:hover:from-orange-300 dark:hover:to-orange-400 text-white font-medium rounded-lg px-4 py-2 flex items-center gap-2 transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] hover:shadow-md hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0C0B0A] cursor-pointer"
      >
        <LogIn className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-[2px]" />
        <span>Sign In</span>
      </Button>
    </div>
  );
}

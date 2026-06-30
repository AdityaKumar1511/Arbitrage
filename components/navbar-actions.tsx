"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

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
    </div>
  );
}

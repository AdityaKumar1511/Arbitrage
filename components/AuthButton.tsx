"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

interface AuthButtonProps {
  user: User | null;
}

export function AuthButton({ user }: AuthButtonProps) {
  const [showAuthModel, setShowAuthModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAction = async () => {
    if (user) {
      setLoading(true);
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        router.refresh();
      } catch (err) {
        console.error("Error signing out:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setShowAuthModel(true);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-orange-100 dark:border-zinc-800"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center text-xs font-bold text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-900/30">
                {(user.user_metadata?.full_name || user.email || "?")[0].toUpperCase()}
              </div>
            )}
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 hidden sm:inline select-none">
              {user.user_metadata?.full_name || user.email?.split("@")[0]}
            </span>
          </div>
        )}

        <Button
          onClick={handleAction}
          disabled={loading}
          className="group relative bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 hover:from-orange-400 hover:to-orange-500 dark:hover:from-orange-300 dark:hover:to-orange-400 text-white font-medium rounded-lg px-4 py-2 flex items-center gap-2 transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] hover:shadow-md hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0C0B0A] cursor-pointer"
        >
          {user ? (
            <>
              <LogOut className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-[2px]" />
              <span>{loading ? "Signing Out..." : "Sign Out"}</span>
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-[2px]" />
              <span>{loading ? "Connecting..." : "Sign In"}</span>
            </>
          )}
        </Button>
      </div>

      <AuthModal
        isOpen={showAuthModel}
        onClose={() => setShowAuthModel(false)}
      />
    </>
  );
}

export default AuthButton;

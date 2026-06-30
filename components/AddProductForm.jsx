"use client";

import React, { useState, useEffect } from "react";
import { Link2, Loader2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { addProduct } from "@/app/actions";
import { AuthModal } from "./AuthModal";

export function AddProductForm({ user }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Connecting to store...");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }

  // Cycle through engaging scraping messages to keep the user updated during the 5-10s scrape time
  useEffect(() => {
    if (!loading) return;
    
    const messages = [
      "Connecting to store...",
      "Bypassing bot protections...",
      "Analyzing product page structure...",
      "Extracting product details...",
      "Locating price & currency...",
      "Downloading thumbnail image...",
      "Saving to price tracker..."
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setStatusMessage(messages[index]);
    }, 1500);

    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!url || !url.trim()) {
      setMessage({ type: "error", text: "Please enter a product URL." });
      return;
    }

    // Check auth
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    setStatusMessage("Connecting to store...");
    
    try {
      const result = await addProduct(url);
      
      if (result.success) {
        setMessage({
          type: "success",
          text: `Success! Now tracking "${result.product.name}"`
        });
        setUrl("");
      } else {
        if (result.requireAuth) {
          setShowAuthModal(true);
        } else {
          setMessage({
            type: "error",
            text: result.error || "An error occurred during scraping."
          });
        }
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "An unexpected network error occurred."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 relative">
        <div className="flex-1 relative">
          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 h-5 w-5 pointer-events-none" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            placeholder="Paste product URL (Amazon, Walmart, Flipkart, etc.)"
            className="w-full pl-12 pr-5 py-4 bg-white dark:bg-zinc-900/90 border border-orange-100/50 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:focus:ring-orange-500/10 focus:border-orange-500 dark:focus:border-orange-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 shadow-md shadow-orange-100/5 dark:shadow-black/5 hover:border-orange-200 dark:hover:border-zinc-700 transition-all text-base"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl transition-all duration-200 shadow-md shadow-orange-500/10 dark:shadow-orange-500/5 whitespace-nowrap text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Tracking...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Track Price</span>
            </>
          )}
        </button>
      </form>

      {/* Loading state indicator overlay below input */}
      {loading && (
        <div className="mt-3 flex items-center gap-2.5 px-4 py-2.5 bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100/30 dark:border-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400 text-sm animate-pulse">
          <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
          <span className="font-medium tracking-wide">{statusMessage}</span>
        </div>
      )}

      {/* Feedback message banner */}
      {message && (
        <div
          className={`mt-4 flex items-start gap-3 p-4 rounded-xl border text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
            message.type === "success"
              ? "bg-green-50/80 dark:bg-green-950/10 border-green-100/50 dark:border-green-900/30 text-green-700 dark:text-green-400"
              : "bg-red-50/80 dark:bg-red-950/10 border-red-100/50 dark:border-red-900/30 text-red-700 dark:text-red-400"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
          )}
          <span className="leading-normal">{message.text}</span>
        </div>
      )}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

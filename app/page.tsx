import { NavbarActions } from "../components/navbar-actions";
import { Footer } from "../components/footer";
import { Zap, Shield, Bell } from "lucide-react";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/lib/supabase/server";
import { AddProductForm } from "@/components/AddProductForm";
import { ProductCard } from "@/components/ProductCard";
import React from "react";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let products: any[] = [];
  if (user) {
    const { data } = await supabase
      .from("products")
      .select(`
        *,
        price_history (
          price,
          currency,
          checked_at
        )
      `)
      .order("created_at", { ascending: false });
      
    products = (data || []).map((p: any) => {
      if (p.price_history) {
        p.price_history = p.price_history.sort((a: any, b: any) => new Date(a.checked_at).getTime() - new Date(b.checked_at).getTime());
      }
      return p;
    });
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FFFAF2] to-[#FFF8EE] dark:from-[#0C0B0A] dark:via-[#141311] dark:to-[#080706] flex flex-col relative transition-colors duration-300">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-80 dark:opacity-40" />
      
      {/* Top glowing accent light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-orange-200/10 via-orange-100/5 to-transparent dark:from-orange-500/5 dark:via-orange-950/2 to-transparent rounded-full blur-3xl pointer-events-none" />
 
      {/* Header */}
      <header className="bg-white/70 dark:bg-[#0C0B0A]/70 backdrop-blur-md border-b border-orange-100/20 dark:border-orange-950/20 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-1 font-bold text-2xl tracking-tight text-gray-900 dark:text-gray-100 select-none">
            <span>arbitr</span>
            <span className="inline-flex items-center justify-center text-orange-500 dark:text-orange-400">
              <svg className="w-6 h-6 stroke-[3.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l5-5 4 4 9-9" />
                <path d="M18 7h3v3" />
              </svg>
            </span>
            <span>ge</span>
          </div>

          {/* Theme Toggle & Sign In Buttons */}
          <div className="flex items-center gap-1">
            <NavbarActions />
            <AuthButton user={user} />
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-8 w-full relative z-10">
        
        {/* Info Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-xs font-semibold border border-orange-100/50 dark:border-orange-900/30 cursor-default select-none tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-orange-400 animate-ping" />
          <span>Real-time price tracking & smart drops</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-950 dark:text-gray-50 tracking-tight text-center leading-[1.1] mt-8 max-w-4xl">
          Never Miss a <span className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">Price Drop</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl text-center max-w-2xl mt-5 font-normal leading-relaxed">
          Track prices from any e-commerce site. Get instant alerts when prices drop. Save money effortlessly.
        </p>

        {/* Dynamic Search/Track Bar */}
        <AddProductForm user={user} />

        {/* Tracked Products Dashboard */}
        {user ? (
          <div className="w-full max-w-5xl mt-16 pt-8 border-t border-orange-100/20 dark:border-zinc-900/40">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-950 dark:text-gray-50 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  Your Tracked Products
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Monitoring prices and notifying you of any drops.
                </p>
              </div>
              <span className="text-xs bg-orange-50 dark:bg-orange-950/20 border border-orange-100/40 dark:border-orange-900/30 text-orange-600 dark:text-orange-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider select-none">
                {products.length} {products.length === 1 ? "Product" : "Products"}
              </span>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-xs border border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl text-center max-w-2xl mx-auto shadow-xs">
                <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-500 dark:text-orange-400 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">No tracked products yet</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
                  Paste a product link from Amazon, Walmart, or any e-commerce site above to start tracking.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-xl mt-12 text-center p-6 bg-orange-50/10 border border-orange-100/10 rounded-2xl">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              💡 <span className="font-semibold text-gray-700 dark:text-gray-300">Sign in</span> to view your personal price tracking dashboard and save products.
            </p>
          </div>
        )}

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mt-24 pb-16">
          
          {/* Card 1: Lightning Fast */}
          <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xs border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-8 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-orange-100/80 dark:hover:border-orange-950/80 transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center mb-5 text-orange-500 dark:text-orange-400 group-hover:bg-orange-500 dark:group-hover:bg-orange-500 group-hover:text-white dark:group-hover:text-black transition-all duration-300 shadow-xs">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-light">
              Arbitrage extracts prices in seconds, handling JavaScript and dynamic content.
            </p>
          </div>

          {/* Card 2: Always Reliable */}
          <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xs border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-8 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-orange-100/80 dark:hover:border-orange-950/80 transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center mb-5 text-orange-500 dark:text-orange-400 group-hover:bg-orange-500 dark:group-hover:bg-orange-500 group-hover:text-white dark:group-hover:text-black transition-all duration-300 shadow-xs">
              <Shield className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-2">
              Always Reliable
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-light">
              Works across all major e-commerce sites with built-in anti-bot protection.
            </p>
          </div>

          {/* Card 3: Smart Alerts */}
          <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xs border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-8 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-orange-100/80 dark:hover:border-orange-950/80 transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center mb-5 text-orange-500 dark:text-orange-400 group-hover:bg-orange-500 dark:group-hover:bg-orange-500 group-hover:text-white dark:group-hover:text-black transition-all duration-300 shadow-xs">
              <Bell className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-2">
              Smart Alerts
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-light">
              Get notified instantly when prices drop below your target.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

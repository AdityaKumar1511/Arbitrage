import { NavbarActions } from "../components/navbar-actions";
import { Footer } from "../components/footer";
import { Zap, Shield, Bell, Link2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FFFAF2] to-[#FFF8EE] dark:from-[#0C0B0A] dark:via-[#141311] dark:to-[#080706] flex flex-col relative overflow-hidden transition-colors duration-300">
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
          <NavbarActions />
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

        {/* Search Input Bar */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-3 mt-10 relative">
          <div className="flex-1 relative">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 h-5 w-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Paste product URL (Amazon, Walmart, etc.)"
              className="w-full pl-12 pr-5 py-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:focus:ring-orange-500/10 focus:border-orange-500 dark:focus:border-orange-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 shadow-md shadow-orange-100/5 dark:shadow-black/5 hover:border-gray-300 dark:hover:border-zinc-700 transition-all text-base"
            />
          </div>
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold rounded-2xl transition-colors duration-200 shadow-md shadow-orange-500/10 dark:shadow-orange-500/5 whitespace-nowrap text-base flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
            Track Price
          </button>
        </div>

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

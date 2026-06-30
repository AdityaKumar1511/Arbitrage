import * as React from "react";

export function Footer() {
  return (
    <footer className="bg-[#12110F] dark:bg-[#080706] text-gray-400 relative z-10">
      {/* Subtle top gradient line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 dark:via-orange-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-1 font-bold text-2xl tracking-tight text-white select-none">
              <span>arbitr</span>
              <span className="inline-flex items-center justify-center text-orange-400">
                <svg className="w-6 h-6 stroke-[3.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l5-5 4 4 9-9" />
                  <path d="M18 7h3v3" />
                </svg>
              </span>
              <span>ge</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Real-time price tracking and smart drop notifications. Monitor your favorite products across all major e-commerce platforms and save money effortlessly.
            </p>
          </div>

          {/* Product Column */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-gray-200 font-semibold text-sm tracking-wider uppercase select-none">
              Product
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#features" className="hover:text-orange-400 transition-colors duration-200">
                Features
              </a>
              <a href="#pricing" className="hover:text-orange-400 transition-colors duration-200">
                Pricing
              </a>
              <a href="#about" className="hover:text-orange-400 transition-colors duration-200">
                How It Works
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-gray-200 font-semibold text-sm tracking-wider uppercase select-none">
              Company
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#about" className="hover:text-orange-400 transition-colors duration-200">
                About
              </a>
              <a href="#contact" className="hover:text-orange-400 transition-colors duration-200">
                Contact
              </a>
              <a 
                href="https://github.com/AdityaKumar1511" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-orange-400 transition-colors duration-200"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-gray-200 font-semibold text-sm tracking-wider uppercase select-none">
              Legal
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#privacy" className="hover:text-orange-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-orange-400 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-zinc-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Arbitrage. All rights reserved.
          </p>
          <p className="text-gray-500 flex items-center gap-1">
            Built by{" "}
            <a 
              href="https://github.com/AdityaKumar1511" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-gray-300 hover:text-orange-400 transition-colors uppercase tracking-widest text-[10px] px-1.5 py-0.5 border border-zinc-800 rounded bg-zinc-900/50"
            >
              AK
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

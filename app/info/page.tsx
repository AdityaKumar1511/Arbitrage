import { NavbarActions } from "../../components/navbar-actions";
import { Footer } from "../../components/footer";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/lib/supabase/server";
import { Zap, Shield, Bell, Sparkles, Code2, Globe, Mail, Lock, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Arbitrage | Features, Pricing & More",
  description: "Learn how Arbitrage tracks prices, explore features, pricing plans, and read our privacy policy and terms of service.",
};

export default async function InfoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FFFAF2] to-[#FFF8EE] dark:from-[#0C0B0A] dark:via-[#141311] dark:to-[#080706] flex flex-col relative transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-80 dark:opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-orange-200/10 via-orange-100/5 to-transparent dark:from-orange-500/5 dark:via-orange-950/2 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="bg-white/70 dark:bg-[#0C0B0A]/70 backdrop-blur-md border-b border-orange-100/20 dark:border-orange-950/20 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-1 font-bold text-2xl tracking-tight text-gray-900 dark:text-gray-100 select-none hover:opacity-80 transition-opacity">
            <span>arbitr</span>
            <span className="inline-flex items-center justify-center text-orange-500 dark:text-orange-400">
              <svg className="w-6 h-6 stroke-[3.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l5-5 4 4 9-9" />
                <path d="M18 7h3v3" />
              </svg>
            </span>
            <span>ge</span>
          </Link>
          <div className="flex items-center gap-1">
            <NavbarActions />
            <AuthButton user={user} />
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full relative z-10 space-y-32">

        {/* ─── FEATURES ─── */}
        <section id="features" className="scroll-mt-24">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-xs font-semibold border border-orange-100/50 dark:border-orange-900/30 uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Core Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-950 dark:text-gray-50 tracking-tight mt-4">
              Powerful <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              Everything you need to track prices intelligently and never overpay again.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Universal Compatibility", desc: "Works across Amazon, Walmart, Flipkart, Zara, and any e-commerce site with structured product pages." },
              { icon: Zap, title: "AI-Powered Extraction", desc: "Uses Firecrawl's LLM schema extraction to intelligently parse product names, prices, currencies, and images." },
              { icon: Shield, title: "Anti-Bot Bypass", desc: "Built-in rotating proxies and JavaScript rendering handle even the most aggressive bot protections." },
              { icon: Bell, title: "Instant Email Alerts", desc: "Receive beautifully designed HTML email notifications the moment a tracked product's price drops." },
              { icon: Code2, title: "Automated Daily Checks", desc: "Supabase pg_cron schedules daily price re-scrapes automatically — no manual intervention required." },
              { icon: Lock, title: "Secure Authentication", desc: "Google OAuth via Supabase with Row Level Security ensures your data is private and protected." },
            ].map((feature, i) => (
              <div key={i} className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xs border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-7 flex flex-col shadow-xs hover:shadow-lg hover:border-orange-100/80 dark:hover:border-orange-950/60 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center mb-4 text-orange-500 dark:text-orange-400 group-hover:bg-orange-500 dark:group-hover:bg-orange-500 group-hover:text-white dark:group-hover:text-black transition-all duration-300 shadow-xs">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 font-bold text-base mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section id="about" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-950 dark:text-gray-50 tracking-tight">
              How It <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              Three simple steps to start saving money on every purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Paste Any URL", desc: "Copy a product link from any e-commerce site and paste it into the search bar. Arbitrage handles the rest." },
              { step: "02", title: "We Track It Daily", desc: "Our automated system re-scrapes prices every 24 hours using Supabase pg_cron and Firecrawl's AI extraction engine." },
              { step: "03", title: "Get Notified", desc: "When a price drops, you'll receive a beautifully crafted email with the exact savings and a direct link to buy." },
            ].map((item, i) => (
              <div key={i} className="relative bg-white/60 dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800/70 rounded-2xl p-8 text-center group hover:border-orange-200 dark:hover:border-orange-950/60 transition-all duration-300">
                <div className="text-6xl font-black text-orange-100 dark:text-orange-950/30 absolute top-4 right-6 select-none group-hover:text-orange-200 dark:group-hover:text-orange-900/40 transition-colors">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="pricing" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-950 dark:text-gray-50 tracking-tight">
              Simple <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Pricing</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              Start for free. Upgrade when you need more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/80 dark:bg-zinc-900/60 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-8 flex flex-col shadow-xs hover:shadow-lg transition-all duration-300">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Free</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Perfect for getting started</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900 dark:text-white">$0</span>
                <span className="text-gray-400 text-sm">/forever</span>
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {["Track up to 5 products", "Daily price checks", "Email drop alerts", "Price history charts", "Google sign-in"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/" className="mt-8 w-full py-3 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-center text-sm hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/20 dark:to-zinc-900/60 border-2 border-orange-200 dark:border-orange-800/50 rounded-2xl p-8 flex flex-col shadow-lg">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                Coming Soon
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Pro</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">For power shoppers</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900 dark:text-white">$5</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {["Unlimited products", "Hourly price checks", "Priority email alerts", "Advanced analytics", "Target price alerts", "Export price data"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button disabled className="mt-8 w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl text-center text-sm opacity-60 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-950 dark:text-gray-50 tracking-tight">
              Get in <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              Have questions, feedback, or want to collaborate? We'd love to hear from you.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white/80 dark:bg-zinc-900/60 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-8 shadow-xs">
            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 bg-gray-50/50 dark:bg-zinc-950/30 rounded-xl border border-gray-100/50 dark:border-zinc-800/50">
                <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium uppercase tracking-wider">Email</p>
                  <a href="mailto:adityakumar1511official@gmail.com" className="text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">
                    adityakumar1511official@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50/50 dark:bg-zinc-950/30 rounded-xl border border-gray-100/50 dark:border-zinc-800/50">
                <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-500">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium uppercase tracking-wider">GitHub</p>
                  <a href="https://github.com/AdityaKumar1511/Arbitrage" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">
                    github.com/AdityaKumar1511/Arbitrage
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRIVACY POLICY ─── */}
        <section id="privacy" className="scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 dark:text-gray-50 tracking-tight flex items-center justify-center gap-3">
              <Lock className="w-7 h-7 text-orange-500" />
              Privacy Policy
            </h2>
          </div>
          <div className="bg-white/80 dark:bg-zinc-900/60 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-8 shadow-xs prose prose-sm dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-li:text-gray-600 dark:prose-li:text-gray-400 prose-strong:text-gray-800 dark:prose-strong:text-gray-200">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Last updated: July 1, 2026</p>
            
            <h3>1. Information We Collect</h3>
            <p>When you sign in with Google, we receive your name, email address, and profile picture from Google. We store the product URLs you choose to track and the price history data associated with them.</p>
            
            <h3>2. How We Use Your Data</h3>
            <ul>
              <li>To provide price tracking and email alert services</li>
              <li>To display your tracked products and price history charts</li>
              <li>To send transactional emails when prices drop on your tracked products</li>
            </ul>
            
            <h3>3. Data Security</h3>
            <p>Your data is secured using Supabase Row Level Security (RLS) policies, ensuring each user can only access their own products. All communications are encrypted via HTTPS. We never sell, share, or trade your personal data.</p>
            
            <h3>4. Third-Party Services</h3>
            <p>We use Google OAuth for authentication, Supabase for database storage, Firecrawl for web scraping, and Resend for email delivery. Each service has its own privacy policy.</p>
            
            <h3>5. Data Deletion</h3>
            <p>You can remove any tracked product at any time. To delete your account entirely, contact us at the email address listed above.</p>
          </div>
        </section>

        {/* ─── TERMS OF SERVICE ─── */}
        <section id="terms" className="scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 dark:text-gray-50 tracking-tight flex items-center justify-center gap-3">
              <FileText className="w-7 h-7 text-orange-500" />
              Terms of Service
            </h2>
          </div>
          <div className="bg-white/80 dark:bg-zinc-900/60 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-8 shadow-xs prose prose-sm dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-li:text-gray-600 dark:prose-li:text-gray-400 prose-strong:text-gray-800 dark:prose-strong:text-gray-200">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Last updated: July 1, 2026</p>
            
            <h3>1. Acceptance of Terms</h3>
            <p>By using Arbitrage, you agree to these Terms of Service. If you do not agree, please discontinue use of the platform immediately.</p>
            
            <h3>2. Service Description</h3>
            <p>Arbitrage is a price tracking tool that monitors product prices on third-party e-commerce websites. We do not guarantee the accuracy of scraped data, as prices may change between checks or be displayed differently across regions.</p>
            
            <h3>3. User Responsibilities</h3>
            <ul>
              <li>You must provide a valid Google account for authentication</li>
              <li>You agree not to abuse the scraping service or attempt to circumvent rate limits</li>
              <li>You are responsible for the product URLs you submit for tracking</li>
            </ul>
            
            <h3>4. Limitation of Liability</h3>
            <p>Arbitrage is provided &quot;as is&quot; without warranties of any kind. We are not responsible for missed price drops, inaccurate price data, or failed email notifications. Purchase decisions are entirely your own responsibility.</p>
            
            <h3>5. Modifications</h3>
            <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.</p>
          </div>
        </section>

      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

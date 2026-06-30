import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Arbitrage | Track Prices & Get Notifications",
  description: "A premium price-tracking and drop-notification platform created by Aditya Kumar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#FFFDF9] dark:bg-[#0C0B0A] text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300 overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
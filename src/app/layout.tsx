import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Sparkles, Heart } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animation Lab — Interactive Web & Mobile Animations Playground",
  description: "Modern, interactive showcase and playground for React, Framer Motion, and React Native Reanimated animations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg-page)] text-[var(--color-text-main)] selection:bg-[#2196F3]/20 selection:text-[#0D47A1] dark:selection:bg-[#2196F3]/30 dark:selection:text-[#90caf9]">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] py-8 text-center text-xs text-[#6B7280] backdrop-blur-md transition-colors">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#2196F3]" />
                <span className="font-semibold text-[#282A35] dark:text-white">AnimationLab</span>
                <span>— Open Source Interactive Showcase</span>
              </div>
              <div className="flex items-center gap-1">
                Crafted with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for Web & Mobile developers
              </div>
              <div>
                <a
                  href="https://github.com/omercnkc/animations-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B7280] transition-colors hover:text-[#2196F3]"
                >
                  GitHub Repository
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

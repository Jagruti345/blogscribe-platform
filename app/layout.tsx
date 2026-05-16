import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import { ThemeContextProvider } from "./context/ThemeContext";
import AuthProvider from "./providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogScribe",
  description: "A blog website built with Next.js and Tailwind CSS",
  keywords: ["BlogScribe", "Blogs", "Next.js"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
        <ThemeContextProvider>
          <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
            <div className="max-w-2xl max-sm:max-w-xs md:max-w-4xl lg:max-w-7xl mx-auto px-7 md:px-12 lg:px-20">
              <Navbar />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
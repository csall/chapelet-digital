import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SwRegister } from "@/components/SwRegister";
import { MotionConfig } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#020617", // slate-950
};

export const metadata: Metadata = {
  title: "Chapelet Digital | Dhikr & Invocations",
  description:
    "Chapelet Digital - Chapelet virtuel immersif en 3D. Une expérience méditative moderne et apaisante.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chapelet Digital",
    startupImage: [],
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen h-[100dvh] overflow-hidden antialiased selection:bg-indigo-500/30`}
      >
        <MotionConfig reducedMotion="user">
          <SwRegister />
          <ThemeProvider />
          {children}
          <BottomNav />
        </MotionConfig>
      </body>
    </html>
  );
}

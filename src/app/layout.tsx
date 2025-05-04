import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import { Suspense } from "react";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import { hasCookie } from 'cookies-next';
import { GoogleTagManager } from '@next/third-parties/google';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hören",
  description: "Love above all.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        {typeof window !== "undefined" && hasCookie("consent") && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
        )}

      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>
            <Analytics />
          </Suspense>
          <CookieConsent />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

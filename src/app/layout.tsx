import type { Metadata } from "next";
import { LoadingProvider } from "@/shared/ui/providers/loading/LoadingProvider";
import Header from "@/widgets/header/ui/Header";
import "./globals.css";
import React, { JSX } from "react";
import PWAProvider from "@/shared/ui/providers/pwa/PWAProvider";

export const metadata: Metadata = {
  title: "Podcaster | List",
  description:
    "An application to browse the top 100 most popular podcasts from the iTunes API.",
  other: {
    "preconnect-itunes": "https://itunes.apple.com",
    "preconnect-proxy": "https://api.allorigins.win",
    "preconnect-images": "https://is1-ssl.mzstatic.com",
  },
};

/**
 * Root layout for the application.
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <PWAProvider />
        <LoadingProvider>
          <Header />
          <main className="pt-16">{children}</main>
        </LoadingProvider>
      </body>
    </html>
  );
}

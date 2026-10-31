import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/chrome/ThemeProvider";
import MotionProvider from "@/components/chrome/MotionProvider";
import Cursor from "@/components/chrome/Cursor";
import Grain from "@/components/chrome/Grain";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import SiteHeader from "@/components/chrome/SiteHeader";
import CommandPalette from "@/components/chrome/CommandPalette";
import Dock from "@/components/chrome/Dock";
import Toaster from "@/components/chrome/Toaster";
import { site } from "@/content";
import { assertContent } from "@/content/validate";

assertContent();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
  openGraph: {
    title: site.seo.ogTitle,
    description: site.seo.ogDescription,
    type: "website",
  },
  twitter: {
    card: site.seo.twitterCard,
    title: site.seo.ogTitle,
    description: site.seo.ogDescription,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:text-paper"
            >
              Skip to content
            </a>
            <ScrollProgress />
            <Grain />
            <Cursor />
            <SiteHeader />
            <main id="main" className="relative flex-1">
              {children}
            </main>
            <Dock />
            <CommandPalette />
            <Toaster />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

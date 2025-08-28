import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// 加载本地 Waterfall 字体
const waterfallFont = localFont({
  src: "./fonts/Waterfall-Regular.ttf",
  variable: "--font-waterfall",
  weight: "400",
  style: "normal",
  display: "swap",
});

// 加载本地 Alex Brush 字体
const alexBrushFont = localFont({
  src: "./fonts/AlexBrush-Regular.ttf",
  variable: "--font-alex-brush",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Momentie" +
      "Emiya",
  description: "A minimalist blog by MomentieEmiya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${waterfallFont.variable} ${ibmPlexMono.variable} ${alexBrushFont.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}

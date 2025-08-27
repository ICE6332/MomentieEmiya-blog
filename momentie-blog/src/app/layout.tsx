import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

// 加载本地 Waterfall 字体
const waterfallFont = localFont({
  src: "./fonts/Waterfall-Regular.ttf",
  variable: "--font-waterfall",
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
      className={`${geistSans.variable} ${geistMono.variable} ${waterfallFont.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}

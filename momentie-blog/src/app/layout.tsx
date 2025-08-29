import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

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

const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  waterfallFont.variable,
  ibmPlexMono.variable,
  alexBrushFont.variable,
];

export const metadata: Metadata = {
  title: "MomentieEmiya",
  description: "A minimalist blog by MomentieEmiya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(...fontVariables)}>
      <body className="antialiased">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 禁用右键菜单
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
              });
              
              // 禁用选择文本
              document.addEventListener('selectstart', function(e) {
                e.preventDefault();
                return false;
              });
              
              // 禁用拖拽
              document.addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
              });
              
              // 禁用键盘快捷键
              document.addEventListener('keydown', function(e) {
                // 禁用 F12, Ctrl+U, Ctrl+S, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                if (e.key === 'F12' || 
                    (e.ctrlKey && ['u', 's', 'a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))) {
                  e.preventDefault();
                  return false;
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}

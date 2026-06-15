import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ThemeAnimationProvider } from "./context/ThemeAnimationContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al-Fraskhan A. Jose — Portfolio",
  description: "Full-Stack Developer Portfolio of Al-Fraskhan A. Jose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload the light-mode idle frame so it paints before JS loads */}
        <link
          rel="preload"
          as="image"
          href="/profilepic/frame_01.webp"
          type="image/webp"
        />
      </head>
      <body className="min-h-full antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ThemeAnimationProvider>{children}</ThemeAnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

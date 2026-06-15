import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ThemeAnimationProvider } from "./context/ThemeAnimationContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al-Fraskhan A. Jose — Portfolio",
  description: "Full-Stack Developer Portfolio of Al-Fraskhan A. Jose",
  icons: {
    icon: "/Fras J.webp",
    shortcut: "/Fras J.webp",
    apple: "/Fras J.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ThemeAnimationProvider>{children}</ThemeAnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/ui/utils";
import { Providers } from "@/shared/redux/providers";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
import { Toaster } from "@/ui/toaster";

export const metadata: Metadata = {
  title: "Уведомления",
  description: "Fullstack уведомления",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

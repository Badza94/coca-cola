"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/lenis-scroll";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LenisScroll>{children}</LenisScroll>
      </body>
    </html>
  );
}

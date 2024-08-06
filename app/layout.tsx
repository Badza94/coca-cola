"use client";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/lenis-scroll";

const inter = Inter({ subsets: ["latin"] });
const lobster = Poppins({ weight: ["400", "800"], subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lobster.className}>
        <LenisScroll>{children}</LenisScroll>
      </body>
    </html>
  );
}

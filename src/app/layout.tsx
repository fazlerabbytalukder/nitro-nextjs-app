import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Exo_2, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const exo = Exo_2({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "Nitro Energy Drink",
  description: "Five flavours. One full charge.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${exo.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

import { Inter, Playfair_Display } from "next/font/google";

export const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const fontClasses = `${inter.variable} ${playfair.variable} antialiased`;

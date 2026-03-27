import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "SURFIT.IA — AI-Powered Surf Coaching & Wave Guide",
  description:
    "Analyze your surf technique with AI, explore the world's top 10 surf spots, find the best gear, and plan your next wave adventure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} dark`}
    >
      <body className="min-h-screen bg-slate-950 text-white font-body antialiased">
        {children}
      </body>
    </html>
  );
}

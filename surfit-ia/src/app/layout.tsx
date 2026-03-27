import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SURFIT.IA — AI-Powered Surf Coaching & Wave Guide",
  description:
    "Analyze your surf technique with AI, explore the world's top 10 surf spots, find the best gear, and plan your next wave adventure.",
  openGraph: {
    title: "SURFIT.IA — AI-Powered Surf Coaching & Wave Guide",
    description:
      "Analyze your surf technique with AI, explore the world's top 10 surf spots, find the best gear, and plan your next wave adventure.",
    type: "website",
    url: "https://waveridersurf.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}

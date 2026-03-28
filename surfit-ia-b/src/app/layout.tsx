import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "SURFIT.IA — AI-Powered Surf Coaching & Wave Guide",
  description:
    "Analyze your surf technique with AI, explore the world's top 10 surf spots, find the best gear, and plan your next wave adventure.",
  openGraph: {
    title: "SURFIT.IA — AI-Powered Surf Coaching & Wave Guide",
    description:
      "Analyze your surf technique with AI, explore the world's top 10 surf spots, find the best gear, and plan your next wave adventure.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-[#09090B] text-[#F8FAFC]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

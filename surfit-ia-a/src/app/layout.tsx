import type { Metadata } from "next"
import { Bebas_Neue, Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"

const headingFont = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
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
      <body className="min-h-full flex flex-col font-body bg-[#0A0F1C] text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, ExternalLink } from "lucide-react"

const navLinks = [
  { label: "AI Coach", href: "#ai-coach" },
  { label: "Features", href: "#features" },
  { label: "Spots", href: "#spots" },
  { label: "Adventures", href: "#adventures" },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [sheetOpen, setSheetOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sectionIds = ["ai-coach", "features", "spots", "adventures"]
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <header
      role="navigation"
      className={`fixed top-0 w-full z-50 h-16 flex items-center transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-500 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
        <a
          href="/"
          className="font-bold text-lg text-slate-50"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          SURFIT.IA
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "")
            const isActive = activeSection === sectionId
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-150 border-b-2 ${
                  isActive
                    ? "text-slate-50 border-indigo-500"
                    : "text-slate-500 border-transparent hover:text-slate-300"
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="text-sm text-slate-400 hover:text-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            aria-label="Toggle language"
          >
            EN
          </Button>
          <Button
            variant="ghost"
            className="text-sm text-slate-400 hover:text-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
           
          >
            <a
              href="https://www.windy.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Surf Forecast on Windy.com"
            >
              Forecast
              <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-slate-400 hover:text-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-zinc-950 border-l border-zinc-800 w-72"
            >
              <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className="text-base font-medium text-slate-400 hover:text-slate-50 transition-colors duration-150 py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="border-t border-zinc-800 pt-4 mt-4 flex flex-col gap-4">
                  <button
                    className="text-sm text-slate-400 hover:text-slate-300 text-left"
                    aria-label="Toggle language"
                  >
                    English
                  </button>
                  <a
                    href="https://www.windy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-slate-300 flex items-center"
                  >
                    Surf Forecast
                    <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

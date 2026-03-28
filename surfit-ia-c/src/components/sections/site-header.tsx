"use client"

import { useState, useEffect, useRef } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, ExternalLink, Globe } from "lucide-react"

const navItems = [
  { label: "AI Coach", href: "#ai-coach" },
  { label: "Spots", href: "#spots" },
  { label: "Shop", href: "#features" },
  { label: "Adventures", href: "#adventures" },
]

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState("")
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setHidden(currentY > lastScrollY.current && currentY > 200)
      lastScrollY.current = currentY

      const sections = ["ai-coach", "features", "adventures", "spots"]
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 h-16 bg-teal-950/90 backdrop-blur-lg border-b border-cyan-400/15 transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <a
          href="#hero"
          className="font-black text-2xl text-cyan-400 tracking-tighter uppercase"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          SURFIT.IA
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {navItems.map((item) => {
            const isActive =
              (item.href === "#ai-coach" && activeSection === "ai-coach") ||
              (item.href === "#spots" && activeSection === "spots") ||
              (item.href === "#features" && (activeSection === "features")) ||
              (item.href === "#adventures" && activeSection === "adventures")
            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950 ${
                  isActive
                    ? "bg-cyan-400 text-teal-950"
                    : "bg-cyan-400/10 text-white hover:bg-cyan-400/20"
                }`}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span
            className="flex items-center text-teal-300 px-2 text-sm"
            aria-label="Language: English"
          >
            <Globe className="h-4 w-4 mr-1" />
            EN
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-rose-500 hover:text-rose-400 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
           
          >
            <a
              href="https://www.windy.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Surf Forecast on Windy.com (opens in new tab)"
            >
              <span className="text-sm hidden sm:inline">Surf Forecast</span>
              <ExternalLink className="h-3.5 w-3.5 ml-1" />
            </a>
          </Button>

          <Sheet>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-teal-950 border-cyan-400/15 w-full sm:w-80"
            >
              <nav className="flex flex-col gap-6 mt-12" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-3xl font-bold text-white uppercase tracking-tight hover:text-cyan-400 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="https://www.windy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-rose-500 hover:text-rose-400 flex items-center gap-2 transition-colors duration-200"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Surf Forecast
                  <ExternalLink className="h-4 w-4" />
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

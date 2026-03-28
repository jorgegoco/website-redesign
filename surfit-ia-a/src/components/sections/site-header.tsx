"use client"

import { useState, useEffect, useRef } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Waves, Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const { t, toggle } = useLanguage()

  const navLinks = [
    { label: t.nav.shop, href: "#features" },
    { label: t.nav.spots, href: "#spots" },
    { label: t.nav.adventures, href: "#adventures" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 80)
      setHidden(currentY > lastScrollY.current && currentY > 400)
      lastScrollY.current = currentY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-gradient-to-r focus:from-blue-500 focus:to-cyan-500 focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>
      <header
        className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "backdrop-blur-2xl bg-[#0A0F1C]/80 border-b border-white/5"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4">
          <a href="#hero" className="flex items-center gap-2" aria-label="SURFIT.IA home">
            <Waves className="h-5 w-5 text-cyan-500" />
            <span className="font-display text-2xl text-white tracking-[0.02em]">
              SURFIT.IA
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="relative text-sm font-medium tracking-[0.05em] text-gray-400 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              className="hidden sm:flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors duration-200 hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 border border-white/10 rounded-full px-3 py-1"
              aria-label={`Switch language to ${t.toggle}`}
            >
              {t.toggle === "ES" ? "EN" : "ES"}
            </button>

            <a
              href="https://www.windy.com/?waves,30.392,-28.125,3"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-gray-400 transition-colors duration-200 hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              aria-label="Surf Forecast (opens in new tab)"
            >
              <Waves className="h-3.5 w-3.5" />
              Surf Forecast
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white hover:bg-white/5"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 bg-[#0A0F1C] border-white/10"
              >
                <div className="flex flex-col gap-6 pt-8">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <Waves className="h-5 w-5 text-cyan-500" />
                      <span className="font-display text-xl text-white">SURFIT.IA</span>
                    </div>
                    <SheetClose>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white hover:bg-white/5"
                        aria-label="Close navigation menu"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href + link.label}>
                        <a
                          href={link.href}
                          className="rounded-lg px-3 py-3 text-sm font-medium tracking-[0.05em] text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                        >
                          {link.label}
                        </a>
                      </SheetClose>
                    ))}
                    <a
                      href="https://www.windy.com/?waves,30.392,-28.125,3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium tracking-[0.05em] text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-cyan-400"
                      aria-label="Surf Forecast (opens in new tab)"
                    >
                      <Waves className="h-4 w-4" />
                      Surf Forecast
                    </a>
                    <button
                      onClick={toggle}
                      className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium tracking-[0.05em] text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-cyan-400 text-left"
                      aria-label={`Switch language to ${t.toggle}`}
                    >
                      {t.toggle === "ES" ? "EN → ES" : "ES → EN"}
                    </button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}

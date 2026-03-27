"use client"

import { useState, useEffect } from "react"
import { Menu, ExternalLink } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { label: "AI Coach", href: "#ai-coach" },
  { label: "Spots", href: "#spots" },
  { label: "Shop", href: "#features" },
  { label: "Adventures", href: "#adventures" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      setVisible(currentY < lastScrollY || currentY < 50)
      setLastScrollY(currentY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled ? "backdrop-blur-xl bg-slate-950/80 border-b border-white/10" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="font-heading text-xl font-bold tracking-tight text-white">
          SURFIT.IA
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-cyan-500 after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.windy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            Surf Forecast
            <ExternalLink className="h-3 w-3" />
          </a>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center size-8 rounded-lg text-white hover:bg-white/10 transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-950 border-white/10 w-72">
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://www.windy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg text-gray-300 hover:text-cyan-400 transition-colors"
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

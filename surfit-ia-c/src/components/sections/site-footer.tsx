"use client"

import { Separator } from "@/components/ui/separator"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const featureLinks = [
  { label: "AI Coach", href: "#ai-coach" },
  { label: "Surf Shop", href: "#features" },
  { label: "Travel", href: "#features" },
  { label: "Media", href: "#features" },
]

const spotLinks = [
  { label: "Pipeline", href: "#spots" },
  { label: "Teahupo'o", href: "#spots" },
  { label: "Uluwatu", href: "#spots" },
]

const externalLinks = [
  { label: "Surf Forecast", href: "https://www.windy.com", ariaLabel: "Surf Forecast on Windy.com (opens in new tab)" },
  { label: "YouTube Channel", href: "https://www.youtube.com", ariaLabel: "YouTube Channel (opens in new tab)" },
  { label: "Google Maps", href: "https://www.google.com/maps", ariaLabel: "Google Maps (opens in new tab)" },
]

export default function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer
      className="bg-teal-950 border-t border-cyan-400/20 pt-16 pb-6"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p
              className="text-2xl font-black text-cyan-400 tracking-tighter uppercase mb-3"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              SURFIT.IA
            </p>
            <p
              className="text-sm text-teal-300 leading-relaxed"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {t.footer.tagline}
            </p>
          </div>

          {/* Features */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-4"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {t.footer.colFeatures}
            </p>
            <nav aria-label="Feature links">
              <ul className="flex flex-col gap-2">
                {featureLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-teal-300 hover:text-cyan-400 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Surf Spots */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-4"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {t.footer.colSpots}
            </p>
            <nav aria-label="Top surf spot links">
              <ul className="flex flex-col gap-2">
                {spotLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-teal-300 hover:text-cyan-400 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#spots"
                    className="text-sm font-medium text-cyan-400 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {t.footer.viewAll}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* External */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-4"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {t.footer.colExternal}
            </p>
            <nav aria-label="External links">
              <ul className="flex flex-col gap-2">
                {externalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className="inline-flex items-center gap-1 text-sm text-teal-300 hover:text-cyan-400 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent mb-4" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          <p
            className="text-sm text-teal-300"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-teal-300" style={{ fontFamily: "DM Sans, sans-serif" }}>{t.footer.privacy}</span>
            <span className="text-sm text-teal-300" style={{ fontFamily: "DM Sans, sans-serif" }}>{t.footer.terms}</span>
          </div>
          <p
            className="text-xs text-teal-500"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Built with AI
          </p>
        </div>
      </div>
    </footer>
  )
}

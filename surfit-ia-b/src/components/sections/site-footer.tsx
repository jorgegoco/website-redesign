"use client"

import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/contexts/language-context"

const productLinks = [
  { label: "AI Coach", href: "#ai-coach" },
  { label: "Surf Shop", href: "#features" },
  { label: "Travel", href: "#adventures" },
  { label: "Spot Gallery", href: "#features" },
]

const exploreLinks = [
  { label: "Top 10 Spots", href: "#spots" },
  { label: "Adventures", href: "#adventures" },
  {
    label: "Surf Forecast",
    href: "https://www.windy.com",
    external: true,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    external: true,
  },
]

// TODO: Add real Privacy Policy and Terms URLs when available
const legalLinks: { label: string; href: string }[] = []

export default function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer
      aria-label="Site footer"
      className="bg-zinc-900/50 border-t border-zinc-800 py-12 md:py-16"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <p
              className="font-bold text-lg text-slate-50"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              SURFIT.IA
            </p>
            <p
              className="text-sm text-slate-500 mt-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <p
              className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t.footer.colProduct}
            </p>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-150"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t.footer.colExplore}
            </p>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-150"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t.footer.colLegal}
            </p>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-150"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-zinc-800 mt-8 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-slate-600"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            &copy; {new Date().getFullYear()} SURFIT.IA. {t.footer.rights}.
          </p>
          <p
            className="text-xs text-slate-600"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Built with AI
          </p>
        </div>
      </div>
    </footer>
  )
}

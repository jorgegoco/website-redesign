"use client"

import { Separator } from "@/components/ui/separator"
import { Waves } from "lucide-react"

const featureLinks = [
  { label: "AI Coach", href: "#features" },
  { label: "Surf Shop", href: "#features" },
  { label: "Travel", href: "#features" },
  { label: "Spot Gallery", href: "#features" },
]

const exploreLinks = [
  { label: "Top 10 Spots", href: "#spots" },
  { label: "Adventures", href: "#adventures" },
  { label: "Best Trips", href: "#adventures" },
]

const externalLinks = [
  {
    label: "Surf Forecast",
    href: "https://www.windy.com/?waves,30.392,-28.125,3",
  },
  // TODO: Replace with real YouTube channel URL when available
  // { label: "YouTube", href: "https://www.youtube.com/@surfit-ia" },
]

export default function SiteFooter() {
  return (
    <footer
      id="footer"
      className="border-t border-white/5 bg-[#0A0F1C] py-12 md:py-16 px-4"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Waves className="h-5 w-5 text-cyan-500" />
              <span className="font-display text-xl text-white">SURFIT.IA</span>
            </div>
            <p className="font-body text-sm leading-relaxed text-gray-500">
              AI-powered surf coaching. Analyze your technique, explore the
              world&apos;s best waves, and plan your next adventure.
            </p>
          </div>

          {/* Features column */}
          <div>
            <h4 className="mb-4 font-body text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              Features
            </h4>
            <ul className="space-y-2.5">
              {featureLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-gray-500 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore column */}
          <div>
            <h4 className="mb-4 font-body text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-gray-500 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External column */}
          <div>
            <h4 className="mb-4 font-body text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              External
            </h4>
            <ul className="space-y-2.5">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-gray-500 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    aria-label={`${link.label} (opens in new tab)`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/5" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-gray-600">
            &copy; 2026 SURFIT.IA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* TODO: Link to real Privacy Policy and Terms pages when available */}
            <span className="font-body text-xs text-gray-600">Privacy</span>
            <span className="font-body text-xs text-gray-600">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

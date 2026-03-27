import { Separator } from "@/components/ui/separator"
import { ExternalLink } from "lucide-react"

const footerLinks = {
  Features: [
    { label: "AI Coach", href: "#ai-coach" },
    { label: "Surf Spots", href: "#spots" },
    { label: "Shop", href: "#features" },
    { label: "Adventures", href: "#adventures" },
  ],
  External: [
    { label: "Surf Forecast", href: "https://www.windy.com", external: true },
    { label: "YouTube", href: "https://www.youtube.com", external: true },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-heading text-xl font-bold tracking-tight text-white mb-3">
              SURFIT.IA
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              AI-powered surf coaching & wave guide. Analyze your technique, explore the
              world&apos;s best breaks, and plan your next session.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                {title}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1"
                    >
                      {link.label}
                      {"external" in link && link.external && (
                        <ExternalLink className="h-3 w-3" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} SURFIT.IA. All rights reserved.</p>
          <p>Built with AI</p>
        </div>
      </div>
    </footer>
  )
}

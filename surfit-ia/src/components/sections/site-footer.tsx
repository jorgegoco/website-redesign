import { Waves } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Features: [
    { label: "AI Coach", href: "#ai-coach" },
    { label: "Surf Shop", href: "#features" },
    { label: "Travel", href: "#features" },
    { label: "Spot Gallery", href: "#features" },
  ],
  Explore: [
    { label: "Top 10 Spots", href: "#spots" },
    { label: "Adventures", href: "#adventures" },
    { label: "Best Trips", href: "#adventures" },
  ],
  External: [
    {
      label: "Surf Forecast",
      href: "https://www.windy.com/?waves,30.392,-28.125,3",
    },
    { label: "YouTube", href: "#" },
  ],
};

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Waves className="h-5 w-5 text-cyan-500" />
              <span className="font-bold text-lg tracking-tight text-white font-heading">
                SURFIT.IA
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              AI-powered surf coaching. Analyze your technique, explore the
              world&apos;s best waves, and plan your next adventure.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-white/5" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} SURFIT.IA. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

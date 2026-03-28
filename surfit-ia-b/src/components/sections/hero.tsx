"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2670&auto=format&fit=crop"
          alt="Surfer on wave"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/70 to-zinc-950" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0, ease }}
          className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-400 mb-6"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-50 tracking-[-0.02em] mb-4 uppercase"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          SURFIT.IA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-8"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {t.hero.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="#spots"
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-150 flex items-center gap-1"
          >
            {t.hero.cta}
            <ChevronDown className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

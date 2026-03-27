"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const ease = [0.25, 0.1, 0.25, 1]

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2670&auto=format&fit=crop"
          alt="Deep Ocean"
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
          AI-Powered Surf Coaching
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
          Master the science of surfing with artificial intelligence
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="flex flex-col items-center gap-4"
        >
          <Button
            className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-150 ease-out hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            asChild
          >
            <a href="#" lang="es">
              Entrar al Dashboard
            </a>
          </Button>

          <a
            href="#spots"
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-150 flex items-center gap-1"
          >
            Explore Top 10 Spots
            <ChevronDown className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

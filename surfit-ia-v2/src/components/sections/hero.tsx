"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2670&auto=format&fit=crop')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-6"
        >
          AI-Powered Surf Coaching
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight text-white mb-6"
        >
          SURFIT.IA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Domina la ciencia del surf con inteligencia artificial
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:scale-105 transition-all duration-300 border-0"
          >
            Entrar al Dashboard
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-gray-500" />
      </motion.div>
    </section>
  )
}

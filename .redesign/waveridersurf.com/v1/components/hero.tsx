"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2670&auto=format&fit=crop"
          alt="Deep Ocean"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-cyan-500 mb-4 md:mb-6"
        >
          AI-Powered Surf Coaching
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white font-heading mb-4 md:mb-6"
        >
          SURFIT.IA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto"
        >
          Domina la ciencia del surf con inteligencia artificial.
          AI Surf posture check & correction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base md:text-lg px-10 md:px-12 py-6 md:py-7 rounded-full shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Entrar al Dashboard
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-white/40" />
      </motion.div>
    </section>
  );
}

"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const brandLetters = "SURFIT.IA".split("")

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0, 0, 0.2, 1] },
        }

  return (
    <section
      ref={ref}
      className="relative h-dvh overflow-hidden"
      aria-label="Hero"
    >
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : bgY }}
        className="absolute inset-0 h-[120%]"
      >
        <img
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2670&auto=format&fit=crop"
          alt="Deep ocean wave"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/70 via-[#0A0F1C]/30 to-[#0A0F1C]" />
      </motion.div>

      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <div className="max-w-5xl">
          <motion.p
            {...fadeUp(0.2)}
            className="mb-6 font-body text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-cyan-500"
          >
            AI-Powered Surf Coaching
          </motion.p>

          <h1 className="mb-6 font-display text-[96px] md:text-[128px] lg:text-[160px] leading-[0.85] tracking-[0.02em] text-white">
            {brandLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={prefersReducedMotion ? {} : { clipPath: "inset(0 100% 0 0)" }}
                animate={prefersReducedMotion ? {} : { clipPath: "inset(0 0% 0 0)" }}
                transition={
                  prefersReducedMotion
                    ? {}
                    : {
                        duration: 0.6,
                        delay: 0.4 + i * 0.05,
                        ease: [0.77, 0, 0.175, 1],
                      }
                }
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          <motion.p
            {...fadeUp(0.6)}
            className="mx-auto mb-10 max-w-2xl font-body text-xl md:text-2xl font-light leading-relaxed text-gray-300"
          >
            Domina la ciencia del surf con inteligencia artificial. AI Surf posture
            check &amp; correction.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.95 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            transition={
              prefersReducedMotion
                ? {}
                : { duration: 0.5, delay: 0.8, ease: [0, 0, 0.2, 1] }
            }
          >
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-10 md:px-12 py-6 md:py-7 text-sm md:text-base font-semibold uppercase tracking-[0.1em] text-white shadow-[0_0_50px_rgba(6,182,212,0.25)] transition-all duration-300 hover:shadow-[0_0_70px_rgba(6,182,212,0.35)] hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              aria-label="Entrar al Dashboard"
            >
              Entrar al Dashboard
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
        transition={prefersReducedMotion ? {} : { duration: 0.4, delay: 1.5 }}
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
          transition={
            prefersReducedMotion
              ? {}
              : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ChevronDown className="h-6 w-6 text-white/30" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  )
}

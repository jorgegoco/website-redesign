"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Cpu, MapPin, Radio } from "lucide-react"

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const brandText = "SURFIT.IA"

function useTextScramble(text: string, duration: number = 800, charDelay: number = 50) {
  const [display, setDisplay] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    const chars = text.split("")
    const resolved = new Array(chars.length).fill(false)
    const current = new Array(chars.length).fill("")

    const interval = setInterval(() => {
      for (let i = 0; i < chars.length; i++) {
        if (!resolved[i]) {
          current[i] = scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        }
      }
      setDisplay(current.join(""))
    }, 40)

    chars.forEach((char, i) => {
      setTimeout(() => {
        resolved[i] = true
        current[i] = char
        setDisplay(current.join(""))
        if (resolved.every(Boolean)) {
          clearInterval(interval)
          setDone(true)
        }
      }, charDelay * i + duration / 2)
    })

    return () => clearInterval(interval)
  }, [text, duration, charDelay])

  return { display, done }
}

const statBadges = [
  { icon: MapPin, label: "10 World Spots", color: "text-yellow-400", borderColor: "border-rose-500" },
  { icon: Cpu, label: "AI Coach", color: "text-cyan-400", borderColor: "border-cyan-400" },
  { icon: Radio, label: "Live Forecast", color: "text-yellow-400", borderColor: "border-rose-500" },
]

export default function Hero() {
  const { display, done } = useTextScramble(brandText, 800, 50)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section
      className="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-teal-950 via-cyan-950 to-teal-950"
      aria-label="Hero"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2670&auto=format&fit=crop"
          alt="Deep Ocean"
          className="w-full h-full object-cover opacity-10"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-teal-950/70 via-teal-950/30 to-teal-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center">
        <div className="w-full lg:w-3/5 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400 mb-6"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            AI-POWERED SURF COACHING
          </motion.p>

          <div className="relative mb-6">
            <h1
              className="text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              <span
                className={`${done ? "bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent" : "text-white"} transition-all duration-500`}
              >
                {display || brandText}
              </span>
            </h1>
            {done && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none"
              />
            )}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-teal-200 mb-10 max-w-2xl mx-auto lg:mx-0"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Master the science of surfing with artificial intelligence
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            {/* TODO: Replace href with actual app dashboard URL */}
            <Button
              asChild
              className="bg-gradient-to-r from-cyan-400 to-rose-500 text-teal-950 font-bold rounded-full px-8 py-4 text-lg hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
            >
              <a href="#TODO-dashboard-url">Enter Dashboard</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-cyan-400 text-cyan-400 rounded-full px-8 py-4 text-lg bg-transparent hover:bg-cyan-400/10 hover:text-white hover:border-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
            >
              <a href="#spots">Explore Spots</a>
            </Button>
          </motion.div>
        </div>

        <div className="hidden lg:flex flex-col gap-4 w-2/5 items-end">
          {statBadges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.6 + i * 0.1 }}
              className={`bg-cyan-950 ${badge.borderColor} border rounded-xl px-5 py-3 flex items-center gap-3`}
            >
              <badge.icon className={`h-5 w-5 ${badge.color}`} />
              <span
                className={`text-sm font-bold ${badge.color}`}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="h-8 w-8 text-cyan-400" />
      </motion.div>
    </section>
  )
}

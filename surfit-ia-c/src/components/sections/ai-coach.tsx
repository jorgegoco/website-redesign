"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Camera } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const sectionHeading = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export default function AiCoach() {
  const { t } = useLanguage()
  return (
    <section
      id="ai-coach"
      className="py-20 md:py-28 bg-teal-950"
      aria-label="AI Surf Coach"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={cardReveal}
        >
          <Card className="bg-cyan-950 border border-white/5 border-l-4 border-l-cyan-400 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                <motion.div variants={sectionHeading}>
                  <p
                    className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-yellow-400 mb-4"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {t.aiCoach.label}
                  </p>
                  <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-2"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {t.aiCoach.heading}
                  </h2>
                  <h3
                    className="text-xl md:text-2xl font-semibold text-cyan-400 mb-6"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {t.aiCoach.subheading}
                  </h3>
                  <p
                    className="text-base md:text-lg text-teal-200 mb-8 max-w-xl leading-relaxed"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {t.aiCoach.description}
                  </p>
                  <p
                    className="text-xs text-teal-400/60 uppercase tracking-widest"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {t.aiCoach.comingSoon}
                  </p>
                </motion.div>
              </div>

              <div className="lg:col-span-5 p-8 md:p-12 flex items-center justify-center">
                <div className="w-full aspect-square max-w-sm border-2 border-dashed border-cyan-400/30 rounded-2xl flex flex-col items-center justify-center gap-4 bg-cyan-950/50">
                  <Camera className="h-16 w-16 text-cyan-400/40" />
                  <p
                    className="text-sm text-teal-300 text-center px-4"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    AI analysis overlay preview
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Eye, Activity, Crosshair } from "lucide-react"

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

export default function AiCoach() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="ai-coach"
      aria-label="AI Surf Coach"
      className="bg-zinc-950 py-24 md:py-32"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease }}
        >
          <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-indigo-400 mb-4"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Core Feature
                </p>
                <h2
                  className="text-2xl md:text-3xl font-bold text-slate-50 tracking-[-0.02em] mb-4"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  AI Surf Coach
                </h2>
                <p
                  className="text-base text-slate-400 leading-relaxed mb-6"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Upload a photo of your surf session. Our AI analyzes your stance,
                  rail work, and gaze — delivering instant biomechanical feedback to
                  improve your technique.
                </p>
                <div>
                  <Button
                    className="bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-sm font-semibold transition-all duration-150 ease-out hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    aria-label="Upload Surf Photo for AI analysis"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Surf Photo
                  </Button>
                  <p
                    className="text-xs text-slate-600 mt-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Supports JPG, PNG up to 10MB
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900 border-t lg:border-t-0 lg:border-l border-zinc-800 p-8 md:p-12 flex items-center justify-center min-h-[300px]">
                <div className="w-full max-w-sm space-y-6">
                  <div className="relative aspect-[4/3] bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">
                    <svg
                      viewBox="0 0 400 300"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="0" y1="75" x2="400" y2="75" stroke="#3f3f46" strokeWidth="0.5" />
                      <line x1="0" y1="150" x2="400" y2="150" stroke="#3f3f46" strokeWidth="0.5" />
                      <line x1="0" y1="225" x2="400" y2="225" stroke="#3f3f46" strokeWidth="0.5" />
                      <line x1="100" y1="0" x2="100" y2="300" stroke="#3f3f46" strokeWidth="0.5" />
                      <line x1="200" y1="0" x2="200" y2="300" stroke="#3f3f46" strokeWidth="0.5" />
                      <line x1="300" y1="0" x2="300" y2="300" stroke="#3f3f46" strokeWidth="0.5" />
                      <circle cx="200" cy="80" r="12" stroke="#6366f1" strokeWidth="2" fill="none" />
                      <line x1="200" y1="92" x2="200" y2="170" stroke="#6366f1" strokeWidth="2" />
                      <line x1="200" y1="110" x2="160" y2="140" stroke="#6366f1" strokeWidth="2" />
                      <line x1="200" y1="110" x2="240" y2="130" stroke="#6366f1" strokeWidth="2" />
                      <line x1="200" y1="170" x2="175" y2="230" stroke="#6366f1" strokeWidth="2" />
                      <line x1="200" y1="170" x2="225" y2="230" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="200" cy="80" r="4" fill="#6366f1" />
                      <circle cx="200" cy="110" r="3" fill="#6366f1" />
                      <circle cx="160" cy="140" r="3" fill="#6366f1" />
                      <circle cx="240" cy="130" r="3" fill="#6366f1" />
                      <circle cx="200" cy="170" r="3" fill="#6366f1" />
                      <circle cx="175" cy="230" r="3" fill="#6366f1" />
                      <circle cx="225" cy="230" r="3" fill="#6366f1" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700 text-center">
                      <Eye className="h-4 w-4 text-indigo-400 mx-auto mb-1" />
                      <p className="text-xs text-slate-500 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Gaze</p>
                      <p className="text-sm text-slate-200 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>92%</p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700 text-center">
                      <Activity className="h-4 w-4 text-indigo-400 mx-auto mb-1" />
                      <p className="text-xs text-slate-500 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Rail</p>
                      <p className="text-sm text-slate-200 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>78%</p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700 text-center">
                      <Crosshair className="h-4 w-4 text-indigo-400 mx-auto mb-1" />
                      <p className="text-xs text-slate-500 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Stance</p>
                      <p className="text-sm text-slate-200 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>85%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

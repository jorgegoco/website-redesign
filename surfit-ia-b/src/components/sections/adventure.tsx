"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Play, ArrowRight } from "lucide-react"

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

interface Video {
  title: string
  source: string
}

const videos: Video[] = [
  { title: "Pipeline Masters Highlights", source: "YouTube" },
  { title: "Teahupo'o Code Red Session", source: "YouTube" },
  { title: "Uluwatu Perfect Left Barrels", source: "YouTube" },
  { title: "Big Wave Nazare Winter 2025", source: "YouTube" },
  { title: "Cloud 9 Siargao Full Session", source: "YouTube" },
  { title: "Mavericks Big Wave Challenge", source: "YouTube" },
  { title: "Puerto Escondido Mexican Pipeline", source: "YouTube" },
  { title: "Hossegor Pro Highlights", source: "YouTube" },
]

export default function Adventure() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="adventures"
      aria-label="Adventure and Advice"
      className="bg-zinc-950 py-24 md:py-32"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease }}
          className="mb-10"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.1em] text-indigo-400 mb-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Best Trips & Videos
          </p>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-50 tracking-[-0.02em]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Adventure & Advice
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {videos.map((video, index) => (
                <Card
                  key={index}
                  className="w-72 md:w-72 flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors duration-200"
                >
                  <div className="relative aspect-video bg-zinc-800 flex items-center justify-center">
                    <div className="w-12 h-12 bg-zinc-950/80 rounded-full border border-zinc-700 flex items-center justify-center">
                      <Play className="h-5 w-5 text-slate-300 ml-0.5" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p
                      className="text-sm font-medium text-slate-200"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {video.title}
                    </p>
                    <p
                      className="text-xs text-slate-500 mt-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {video.source}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="bg-zinc-800" />
          </ScrollArea>

          <div className="mt-6">
            {/* TODO: Replace with actual trips/adventures video URL */}
            <a
              href="#TODO-app-gallery"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-150 inline-flex items-center gap-1"
            >
              Watch Best Trips
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

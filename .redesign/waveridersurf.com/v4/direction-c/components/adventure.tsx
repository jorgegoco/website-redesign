"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Play, ExternalLink } from "lucide-react"

interface VideoCard {
  title: string
  thumbnail: string
}

const videos: VideoCard[] = [
  { title: "Pipeline Masters Highlights", thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=600&auto=format&fit=crop" },
  { title: "Teahupo'o Heavy Water", thumbnail: "https://images.unsplash.com/photo-1512100356132-d324c38c7941?q=80&w=600&auto=format&fit=crop" },
  { title: "Bali Surf Adventure", thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=600&auto=format&fit=crop" },
  { title: "Big Wave Mavericks", thumbnail: "https://images.unsplash.com/photo-1512100356132-d324c38c7941?q=80&w=600&auto=format&fit=crop" },
  { title: "Nazare Giant Swells", thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=600&auto=format&fit=crop" },
  { title: "Hossegor Beach Break Barrels", thumbnail: "https://images.unsplash.com/photo-1512100356132-d324c38c7941?q=80&w=600&auto=format&fit=crop" },
]

const sectionHeading = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const cardFade = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" },
  }),
}

export default function Adventure() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <section
      id="adventures"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Adventure and Advice"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1512100356132-d324c38c7941?q=80&w=2670&auto=format&fit=crop"
          alt="Background Wave"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-teal-950/85" />

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={sectionHeading}
          className="mb-12"
        >
          <p
            className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-cyan-400 mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            BEST TRIPS & VIDEOS
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Adventure & Advice
          </h2>
        </motion.div>

        <ScrollArea className="w-full pb-4">
          <div className="flex gap-4 pb-4">
            {videos.map((video, i) => (
              <motion.div
                key={video.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={cardFade}
                className="flex-shrink-0 w-[260px] md:w-[300px]"
              >
                <Card className="bg-cyan-950 rounded-2xl overflow-hidden border border-white/5 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300 group">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-teal-950/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center hover:bg-rose-400 transition-colors duration-200">
                        <Play className="h-5 w-5 text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-base font-semibold text-white"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {video.title}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionHeading}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Button
            className="bg-gradient-to-r from-cyan-400 to-rose-500 text-teal-950 font-bold rounded-full px-8 py-4 text-lg hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
            aria-label="Watch Best Trips"
          >
            Watch Best Trips
          </Button>
          <Button
            variant="outline"
            className="border-2 border-rose-500 text-rose-500 rounded-full px-8 py-4 text-lg bg-transparent hover:bg-rose-500/10 hover:text-white hover:border-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
            aria-label="YouTube Curated List"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            YouTube Curated List
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Play, ExternalLink } from "lucide-react"

interface Trip {
  title: string
  location: string
  thumbnail: string
}

const trips: Trip[] = [
  {
    title: "Bali Dream Session",
    location: "Uluwatu, Indonesia",
    thumbnail:
      "https://images.unsplash.com/photo-1502680390548-bdbac40c7e54?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Nazare Giants",
    location: "Leiria, Portugal",
    thumbnail:
      "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Pipeline Masters",
    location: "Oahu, Hawaii",
    thumbnail:
      "https://images.unsplash.com/photo-1455729552457-5c322b382249?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Mentawai Perfection",
    location: "Sumatra, Indonesia",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Hossegor Barrels",
    location: "Landes, France",
    thumbnail:
      "https://images.unsplash.com/photo-1516370873344-fb7c61054fa9?q=80&w=800&auto=format&fit=crop",
  },
]

export default function Adventure() {
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 40 },
    whileInView: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: prefersReducedMotion
      ? {}
      : { duration: 0.7, delay, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  })

  return (
    <section
      id="adventures"
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="Adventure and Advice"
    >
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1512100356132-d324c38c7941?q=80&w=2670&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C] via-[#0A0F1C]/95 to-[#0A0F1C]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              {...fadeUp(0)}
              className="mb-4 font-body text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-cyan-500"
            >
              Best Trips &amp; Videos
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[0.02em] text-white"
            >
              ADVENTURE &amp; ADVICE
            </motion.h2>
          </div>
          <motion.div {...fadeUp(0.2)}>
            <Button
              variant="outline"
              className="rounded-full border-white/10 text-white hover:bg-white/10 px-6 py-5 text-sm uppercase tracking-[0.1em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              aria-label="Watch Best Trips"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Best Trips
            </Button>
          </motion.div>
        </div>

        {/* Trip cards horizontal scroll */}
        <ScrollArea className="w-full">
          <div className="flex gap-4 md:gap-6 pb-4">
            {trips.map((trip, i) => (
              <motion.div
                key={trip.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={
                  prefersReducedMotion
                    ? {}
                    : { duration: 0.5, delay: i * 0.1, ease: "easeOut" }
                }
                className="flex-shrink-0 w-[280px] md:w-[340px]"
              >
                <Card className="group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={trip.thumbnail}
                      alt={trip.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-body text-base font-semibold text-white">
                      {trip.title}
                    </p>
                    <p className="mt-1 font-body text-xs text-gray-400">
                      {trip.location}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Bottom link */}
        <motion.div {...fadeUp(0.3)} className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 font-body text-xs font-medium uppercase tracking-widest text-gray-400 transition-colors duration-200 hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            aria-label="YouTube Curated List (opens in new tab)"
          >
            YouTube Curated List
            <ExternalLink className="h-3 w-3" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

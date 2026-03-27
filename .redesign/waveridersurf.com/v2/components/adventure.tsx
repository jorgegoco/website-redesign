"use client"

import { motion } from "framer-motion"
import { Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const videos = [
  {
    title: "Pipeline Masters — North Shore",
    thumbnail: "https://images.unsplash.com/photo-1502680390548-bdbac40a1e76?w=400&h=225&fit=crop",
  },
  {
    title: "Big Wave Challenge — Nazaré",
    thumbnail: "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=400&h=225&fit=crop",
  },
  {
    title: "Indo Dream — Uluwatu Sessions",
    thumbnail: "https://images.unsplash.com/photo-1455729552457-5c322b382d44?w=400&h=225&fit=crop",
  },
  {
    title: "Teahupo'o — The Heaviest Wave",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop",
  },
  {
    title: "South Africa — Jeffreys Bay",
    thumbnail: "https://images.unsplash.com/photo-1516370873344-fb7c61054fa9?w=400&h=225&fit=crop",
  },
]

export function Adventure() {
  return (
    <section
      id="adventures"
      className="relative py-24 overflow-hidden"
    >
      {/* Subtle background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512100356132-d324c38c7941?q=80&w=2670&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-slate-950/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-4">
              Best Trips & Videos
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Adventure & Advice
            </h2>
          </div>
          <Button
            variant="outline"
            className="rounded-full border-white/10 text-white hover:bg-white/5 w-fit"
            asChild
          >
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube Curated List
              <ExternalLink className="h-3 w-3 ml-2" />
            </a>
          </Button>
        </motion.div>

        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {videos.map((video, i) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-shrink-0 w-72 md:w-80"
              >
                <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group cursor-pointer">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-white truncate">
                      {video.title}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  )
}

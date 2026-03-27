"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const trips = [
  {
    title: "Bali Dream Session",
    location: "Uluwatu, Indonesia",
    thumbnail:
      "https://images.unsplash.com/photo-1502680390548-bdbac40c7e54?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Nazaré Giants",
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
];

export default function Adventure() {
  return (
    <section id="adventures" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512100356132-d324c38c7941?q=80&w=2664&auto=format&fit=crop"
          alt="Giant Wave Surfing"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-3">
              Best Trips & Videos
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
              Adventure & Advice
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              variant="outline"
              className="border-white/10 text-white hover:bg-white/10 rounded-full"
            >
              <Play className="h-4 w-4 mr-2" />
              Watch Best Trips
            </Button>
          </motion.div>
        </div>

        <ScrollArea className="w-full">
          <div className="flex gap-4 md:gap-6 pb-4">
            {trips.map((trip, i) => (
              <motion.div
                key={trip.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-shrink-0 w-[280px] md:w-[320px]"
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden group cursor-pointer">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={trip.thumbnail}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="h-5 w-5 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-white font-heading mb-1">
                      {trip.title}
                    </h3>
                    <p className="text-xs text-gray-400">{trip.location}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-colors"
          >
            YouTube Curated List
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

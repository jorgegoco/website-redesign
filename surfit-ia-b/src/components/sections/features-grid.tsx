"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Image, ShoppingBag, Plane, MapPin, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export default function FeaturesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const { t } = useLanguage()

  return (
    <section
      id="features"
      aria-label="Features"
      className="bg-zinc-950 py-24 md:py-32"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Media Card — spans 2 cols on desktop */}
          <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-2">
            <Card className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-full hover:border-zinc-700 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-500/10 rounded-lg p-2">
                  <Play className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="bg-indigo-500/10 rounded-lg p-2">
                  <Image className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <h3
                className="text-lg font-semibold text-slate-50 mt-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {t.features.mediaGallery}
              </h3>
              <p
                className="text-sm text-slate-400 mt-2 mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t.features.imageDesc}
              </p>
              <Tabs defaultValue="images" className="mt-4">
                <TabsList className="bg-zinc-800 border border-zinc-700">
                  <TabsTrigger
                    value="images"
                    className="text-sm data-[state=active]:text-indigo-400 data-[state=inactive]:text-slate-500"
                  >
                    {t.features.tabs.images}
                  </TabsTrigger>
                  <TabsTrigger
                    value="videos"
                    className="text-sm data-[state=active]:text-indigo-400 data-[state=inactive]:text-slate-500"
                  >
                    {t.features.tabs.videos}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="images" className="mt-3">
                  <p className="text-xs text-slate-500 uppercase tracking-widest">{t.features.galleryAvailable}</p>
                </TabsContent>
                <TabsContent value="videos" className="mt-3">
                  <p className="text-xs text-slate-500 uppercase tracking-widest">{t.features.videosAvailable}</p>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Surf Shop Card */}
          <motion.div variants={fadeUp}>
            <Card className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-full flex flex-col hover:border-zinc-700 transition-colors duration-200">
              <div className="bg-indigo-500/10 rounded-lg p-2 w-fit">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
              </div>
              <h3
                className="text-lg font-semibold text-slate-50 mt-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {t.features.surfShop.title}
              </h3>
              <p
                className="text-sm text-slate-400 mt-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t.features.surfShop.description}
              </p>
              <p className="mt-auto pt-4 text-xs text-slate-500 uppercase tracking-widest">{t.features.shopSoon}</p>
            </Card>
          </motion.div>

          {/* Google Travel Surf Card */}
          <motion.div variants={fadeUp}>
            <Card className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-full flex flex-col hover:border-zinc-700 transition-colors duration-200">
              <div className="bg-indigo-500/10 rounded-lg p-2 w-fit">
                <Plane className="w-5 h-5 text-indigo-400" />
              </div>
              <h3
                className="text-lg font-semibold text-slate-50 mt-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {t.features.googleTravel.title}
              </h3>
              <p
                className="text-sm text-slate-400 mt-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t.features.googleTravel.description}
              </p>
              <a
                href="https://www.google.com/travel"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-150 inline-flex items-center gap-1"
              >
                {t.features.googleTravel.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Card>
          </motion.div>

          {/* World Spot Gallery Card — spans 2 cols on desktop */}
          <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-2">
            <Card className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-full flex flex-col hover:border-zinc-700 transition-colors duration-200">
              <div className="bg-indigo-500/10 rounded-lg p-2 w-fit">
                <MapPin className="w-5 h-5 text-indigo-400" />
              </div>
              <h3
                className="text-lg font-semibold text-slate-50 mt-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {t.features.worldSpots.title}
              </h3>
              <p
                className="text-sm text-slate-400 mt-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t.features.worldSpots.description}
              </p>
              <a
                href="#spots"
                className="mt-auto pt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-150 inline-flex items-center gap-1"
              >
                {t.features.worldSpots.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

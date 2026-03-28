"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  ArrowRight,
  ImageIcon,
  Play,
  ShoppingBag,
  Globe,
  MapPin,
} from "lucide-react"

export default function FeaturesGrid() {
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 30 },
    whileInView: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" as const },
    transition: prefersReducedMotion
      ? undefined
      : { duration: 0.5, delay, ease: "easeOut" as const },
  })

  return (
    <section
      id="features"
      className="py-24 md:py-36 px-4"
      aria-label="Your Surf Toolkit"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 md:mb-16 text-center">
          <motion.p
            {...fadeUp(0)}
            className="mb-4 font-body text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-cyan-500"
          >
            Everything You Need
          </motion.p>
          <motion.h2
            {...fadeUp(0.1)}
            className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[0.02em] text-white"
          >
            YOUR SURF TOOLKIT
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* AI Coach Card — hero card */}
          <motion.div {...fadeUp(0.1)} className="md:col-span-2 md:row-span-2">
            <Card className="group relative min-h-[320px] md:min-h-[400px] overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-[0_0_40px_rgba(59,130,246,0.12)] hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 pointer-events-none" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                    <Upload className="h-5 w-5 text-white" />
                  </div>
                  <p className="mb-2 font-body text-xs font-medium uppercase tracking-[0.25em] text-cyan-500">
                    AI Coach
                  </p>
                  <h3 className="mb-3 font-display text-2xl md:text-3xl tracking-[0.01em] text-white">
                    BIOMECHANICAL ANALYSIS
                  </h3>
                  <p className="max-w-lg font-body text-sm md:text-base leading-relaxed text-gray-400">
                    Upload a photo to receive instant AI feedback on your stance, rail
                    work, and gaze. AI Surf posture check &amp; correction powered by
                    computer vision.
                  </p>
                </div>
                <div className="mt-6">
                  {/* TODO: Replace href with actual AI coach upload URL (authenticated) */}
                  <Button
                    asChild
                    className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-5 text-sm font-semibold uppercase tracking-[0.1em] text-white shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(6,182,212,0.25)] hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    <a href="#TODO-dashboard-url">
                      Upload Surf Photo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              {/* Decorative wave SVG */}
              <svg
                className="absolute bottom-0 right-0 h-32 w-48 text-cyan-500 opacity-10 pointer-events-none"
                viewBox="0 0 200 100"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 50 Q25 20 50 50 T100 50 T150 50 T200 50 V100 H0Z"
                  fill="currentColor"
                />
              </svg>
            </Card>
          </motion.div>

          {/* Media Card */}
          <motion.div {...fadeUp(0.2)}>
            <Card className="group h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/[0.08] p-5 md:p-6 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-[0_0_40px_rgba(59,130,246,0.12)] hover:scale-[1.02]">
              <Tabs defaultValue="images" className="h-full flex flex-col">
                <TabsList className="mb-4 w-full bg-white/5 border border-white/[0.08]">
                  <TabsTrigger
                    value="images"
                    className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400 text-sm"
                  >
                    <ImageIcon className="mr-1.5 h-3.5 w-3.5" />
                    Surf Images
                  </TabsTrigger>
                  <TabsTrigger
                    value="videos"
                    className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400 text-sm"
                  >
                    <Play className="mr-1.5 h-3.5 w-3.5" />
                    Videos
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="images" className="flex-1 flex flex-col justify-between">
                  <p className="mb-4 font-body text-sm leading-relaxed text-gray-400">
                    Browse stunning surf photography from around the world.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full border-white/10 text-white hover:bg-white/10 text-sm uppercase tracking-[0.1em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    {/* TODO: Replace with actual gallery URL */}
                    <a href="#TODO-app-gallery">View Gallery</a>
                  </Button>
                </TabsContent>
                <TabsContent value="videos" className="flex-1 flex flex-col justify-between">
                  <p className="mb-4 font-body text-sm leading-relaxed text-gray-400">
                    Watch curated surf highlights and session videos.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full border-white/10 text-white hover:bg-white/10 text-sm uppercase tracking-[0.1em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    {/* TODO: Replace with actual video gallery URL */}
                    <a href="#TODO-app-gallery">Watch Highlights</a>
                  </Button>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Surf Shop Card */}
          <motion.div {...fadeUp(0.3)}>
            <Card className="group h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/[0.08] p-5 md:p-6 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-[0_0_40px_rgba(59,130,246,0.12)] hover:scale-[1.02]">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10">
                    <ShoppingBag className="h-4.5 w-4.5 text-orange-400" />
                  </div>
                  <h3 className="mb-2 font-display text-2xl tracking-[0.01em] text-white">
                    SURF SHOP
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-gray-400">
                    Discover the 10 best surf shops online. Best prices, premium boards,
                    and wetsuits in Europe &amp; World.
                  </p>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 w-full justify-start px-0 text-cyan-400 hover:bg-white/5 text-sm uppercase tracking-[0.1em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  {/* TODO: Replace with actual surf shop list URL */}
                  <a href="#TODO-store-list">
                    Open Store List
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Google Travel Card */}
          <motion.div {...fadeUp(0.4)}>
            <Card className="group h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/[0.08] p-5 md:p-6 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-[0_0_40px_rgba(59,130,246,0.12)] hover:scale-[1.02]">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                    <Globe className="h-4.5 w-4.5 text-blue-400" />
                  </div>
                  <h3 className="mb-2 font-display text-2xl tracking-[0.01em] text-white">
                    GOOGLE TRAVEL SURF
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-gray-400">
                    Explore the best surf trips and prices to blue destinations worldwide
                    via Google Travel.
                  </p>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 w-full justify-start px-0 text-cyan-400 hover:bg-white/5 text-sm uppercase tracking-[0.1em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <a href="https://www.google.com/travel" target="_blank" rel="noopener noreferrer">
                    Book Trip
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* World Spot Gallery Card */}
          <motion.div {...fadeUp(0.5)}>
            <Card className="group h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/[0.08] p-5 md:p-6 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-[0_0_40px_rgba(59,130,246,0.12)] hover:scale-[1.02]">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10">
                    <MapPin className="h-4.5 w-4.5 text-green-400" />
                  </div>
                  <h3 className="mb-2 font-display text-2xl tracking-[0.01em] text-white">
                    WORLD SPOT GALLERY
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-gray-400">
                    Explore panoramic photos and the best locations where surfing happens
                    globally.
                  </p>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 w-full justify-start px-0 text-cyan-400 hover:bg-white/5 text-sm uppercase tracking-[0.1em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <a href="#spots">
                    View Spots
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Upload, ShoppingBag, Plane, MapPin, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-4">
          Everything You Need
        </p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Your Surf Command Center
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* AI Coach — 2-column span hero card */}
        <motion.div variants={item} className="md:col-span-2" id="ai-coach">
          <Card className="h-full bg-white/[0.08] border-white/[0.15] hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 group">
            <CardContent className="p-8 flex flex-col md:flex-row gap-8 h-full">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-3">
                  Hero Feature
                </p>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                  AI Surf Coach
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Upload your surf photo and get instant AI feedback on your stance, rail work,
                  and gaze. Our biomechanical analysis engine breaks down your technique
                  frame by frame.
                </p>
                <div>
                  <Button className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 transition-all duration-300 border-0">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Surf Photo
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-3">
                      <Upload className="h-7 w-7 text-white" />
                    </div>
                    <p className="text-sm text-gray-500">Biomechanical Analysis</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Media card */}
        <motion.div variants={item}>
          <Card className="h-full bg-white/[0.08] border-white/[0.15] hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 group">
            <CardContent className="p-8 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5">
                  <Play className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  Surf Media
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Browse stunning surf photography and watch video highlights from the best
                  breaks around the world.
                </p>
              </div>
              <Button variant="outline" className="mt-6 rounded-full border-white/10 text-white hover:bg-white/5">
                Watch Highlights
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Surf Shop */}
        <motion.div variants={item}>
          <Card className="h-full bg-white/[0.08] border-white/[0.15] hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 group">
            <CardContent className="p-8 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5">
                  <ShoppingBag className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  Surf Shop
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Discover the 10 best surf shops online. Best prices, premium boards, and
                  wetsuits in Europe & World.
                </p>
              </div>
              <Button variant="outline" className="mt-6 rounded-full border-white/10 text-white hover:bg-white/5">
                Open Store List
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Google Travel */}
        <motion.div variants={item}>
          <Card className="h-full bg-white/[0.08] border-white/[0.15] hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 group">
            <CardContent className="p-8 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-5">
                  <Plane className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  Google Travel Surf
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Explore the best surf trips and prices to blue destinations worldwide via
                  Google Travel.
                </p>
              </div>
              <Button variant="outline" className="mt-6 rounded-full border-white/10 text-white hover:bg-white/5">
                Book Trip
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* World Spot Gallery */}
        <motion.div variants={item}>
          <Card className="h-full bg-white/[0.08] border-white/[0.15] hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 group">
            <CardContent className="p-8 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5">
                  <MapPin className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  World Spot Gallery
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Explore panoramic photos and the best locations where surfing happens
                  globally.
                </p>
              </div>
              <Button variant="outline" className="mt-6 rounded-full border-white/10 text-white hover:bg-white/5">
                View Spots
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}

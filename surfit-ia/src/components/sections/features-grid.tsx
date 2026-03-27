"use client";

import { motion } from "framer-motion";
import {
  Upload,
  ShoppingBag,
  Globe,
  MapPin,
  Play,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

function GlassCard({
  children,
  className = "",
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 hover:scale-[1.02] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-3">
            Everything You Need
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
            Your Surf Toolkit
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* AI Coach — Hero Card (spans 2 cols) */}
          <GlassCard
            className="md:col-span-2 md:row-span-2 relative overflow-hidden"
            index={0}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/5" />
            <div className="relative p-6 md:p-10 flex flex-col h-full min-h-[320px] md:min-h-[400px]">
              <div className="flex items-center gap-2 mb-4" id="ai-coach">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500">
                  AI Coach
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-heading mb-3">
                Biomechanical Analysis
              </h3>
              <p className="text-gray-400 text-sm md:text-base mb-6 max-w-md">
                Upload a photo to receive instant AI feedback on your stance,
                rail work, and gaze. AI Surf posture check & correction powered
                by computer vision.
              </p>
              <div className="mt-auto">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-full px-8 py-6 shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all hover:scale-105 active:scale-95">
                  Upload Surf Photo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 opacity-10">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full text-cyan-500"
                >
                  <path
                    fill="currentColor"
                    d="M 0 100 Q 50 50 100 100 Q 150 150 200 100 L 200 200 L 0 200 Z"
                  />
                </svg>
              </div>
            </div>
          </GlassCard>

          {/* Media Card */}
          <GlassCard className="overflow-hidden" index={1}>
            <div className="p-6">
              <Tabs defaultValue="images">
                <TabsList className="bg-white/5 border border-white/10 mb-4">
                  <TabsTrigger
                    value="images"
                    className="data-active:bg-white/10 data-active:text-white text-gray-400 text-xs"
                  >
                    <ImageIcon className="h-3.5 w-3.5 mr-1.5" />
                    Surf Images
                  </TabsTrigger>
                  <TabsTrigger
                    value="videos"
                    className="data-active:bg-white/10 data-active:text-white text-gray-400 text-xs"
                  >
                    <Play className="h-3.5 w-3.5 mr-1.5" />
                    Videos
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="images">
                  <p className="text-gray-400 text-sm mb-4">
                    Browse stunning surf photography from around the world.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 text-white hover:bg-white/10 rounded-full text-sm"
                  >
                    View Gallery
                  </Button>
                </TabsContent>
                <TabsContent value="videos">
                  <p className="text-gray-400 text-sm mb-4">
                    Watch the best surf highlights and tutorials.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 text-white hover:bg-white/10 rounded-full text-sm"
                  >
                    Watch Highlights
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </GlassCard>

          {/* Surf Shop */}
          <GlassCard index={2}>
            <div className="p-6">
              <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                <ShoppingBag className="h-4 w-4 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white font-heading mb-2">
                Surf Shop
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Discover the 10 best surf shops online. Best prices, premium
                boards, and wetsuits in Europe & World.
              </p>
              <Button
                variant="ghost"
                className="text-cyan-400 hover:text-cyan-300 hover:bg-white/5 p-0 h-auto font-bold text-xs uppercase tracking-widest"
              >
                Open Store List
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </GlassCard>

          {/* Google Travel */}
          <GlassCard index={3}>
            <div className="p-6">
              <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                <Globe className="h-4 w-4 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white font-heading mb-2">
                Google Travel Surf
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Explore the best surf trips and prices to blue destinations
                worldwide via Google Travel.
              </p>
              <Button
                variant="ghost"
                className="text-cyan-400 hover:text-cyan-300 hover:bg-white/5 p-0 h-auto font-bold text-xs uppercase tracking-widest"
              >
                Book Trip
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </GlassCard>

          {/* World Spot Gallery */}
          <GlassCard index={4}>
            <div className="p-6">
              <div className="h-9 w-9 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
                <MapPin className="h-4 w-4 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white font-heading mb-2">
                World Spot Gallery
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Explore panoramic photos and the best locations where surfing
                happens globally.
              </p>
              <Button
                variant="ghost"
                className="text-cyan-400 hover:text-cyan-300 hover:bg-white/5 p-0 h-auto font-bold text-xs uppercase tracking-widest"
              >
                View Spots
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

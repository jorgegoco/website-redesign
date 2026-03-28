"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Globe, MapPin, Image, Video } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

const sectionHeading = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export default function FeaturesGrid() {
  const [activeTab, setActiveTab] = useState("images")
  const { t } = useLanguage()

  return (
    <section
      id="features"
      className="py-20 md:py-28 bg-teal-950"
      aria-label="Features"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {t.features.label}
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {t.features.heading}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Media Tabs - 2 col span */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <Card className="bg-cyan-950 border border-white/5 border-l-4 border-l-cyan-400 rounded-2xl p-8 h-full hover:scale-[1.03] hover:border-l-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300 group">
              <Tabs
                defaultValue="images"
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="bg-transparent border-0 gap-2 mb-6">
                  <TabsTrigger
                    value="images"
                    className="bg-cyan-400/10 data-[state=active]:bg-cyan-400 data-[state=active]:text-teal-950 rounded-full px-4 py-1.5 text-white text-sm font-medium transition-all duration-200"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <Image className="h-4 w-4 mr-2" />
                    {t.features.tabs.images}
                  </TabsTrigger>
                  <TabsTrigger
                    value="videos"
                    className="bg-cyan-400/10 data-[state=active]:bg-cyan-400 data-[state=active]:text-teal-950 rounded-full px-4 py-1.5 text-white text-sm font-medium transition-all duration-200"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    {t.features.tabs.videos}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="images" className="mt-0" role="tabpanel">
                  <h3
                    className="text-xl md:text-2xl font-bold uppercase text-white mb-3"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {t.features.mediaGallery}
                  </h3>
                  <p
                    className="text-base md:text-lg text-teal-200 mb-6"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {t.features.imageDesc}
                  </p>
                  <p className="text-xs text-teal-400/60 uppercase tracking-widest">{t.features.galleryAvailable}</p>
                </TabsContent>
                <TabsContent value="videos" className="mt-0" role="tabpanel">
                  <h3
                    className="text-xl md:text-2xl font-bold uppercase text-white mb-3"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {t.features.tabs.videos}
                  </h3>
                  <p
                    className="text-base md:text-lg text-teal-200 mb-6"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {t.features.videoDesc}
                  </p>
                  <p className="text-xs text-teal-400/60 uppercase tracking-widest">{t.features.videosAvailable}</p>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Surf Shop */}
          <motion.div variants={cardVariants}>
            <Card className="bg-rose-950 border border-white/5 border-l-4 border-l-rose-500 rounded-2xl p-8 h-full hover:scale-[1.03] hover:border-l-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] transition-all duration-300 group">
              <ShoppingBag className="h-8 w-8 text-rose-500 mb-4" />
              <h3
                className="text-xl md:text-2xl font-bold uppercase text-white mb-3"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {t.features.surfShop.title}
              </h3>
              <p
                className="text-base md:text-lg text-teal-200 mb-6"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {t.features.surfShop.description}
              </p>
              <p className="text-xs text-teal-400/60 uppercase tracking-widest">{t.features.shopSoon}</p>
            </Card>
          </motion.div>

          {/* Google Travel Surf */}
          <motion.div variants={cardVariants}>
            <Card className="bg-yellow-950 border border-white/5 border-l-4 border-l-yellow-400 rounded-2xl p-8 h-full hover:scale-[1.03] hover:border-l-yellow-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] transition-all duration-300 group">
              <Globe className="h-8 w-8 text-yellow-400 mb-4" />
              <h3
                className="text-xl md:text-2xl font-bold uppercase text-white mb-3"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {t.features.googleTravel.title}
              </h3>
              <p
                className="text-base md:text-lg text-teal-200 mb-6"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {t.features.googleTravel.description}
              </p>
              <Button
                asChild
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-400 rounded-full px-6 py-2 font-bold uppercase text-sm hover:bg-yellow-400/10 hover:text-white hover:border-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <a href="https://www.google.com/travel" target="_blank" rel="noopener noreferrer">{t.features.googleTravel.cta}</a>
              </Button>
            </Card>
          </motion.div>

          {/* World Spot Gallery */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <Card className="bg-teal-900 border border-white/5 border-l-4 border-l-cyan-400 rounded-2xl p-8 h-full hover:scale-[1.03] hover:border-l-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300 group">
              <MapPin className="h-8 w-8 text-cyan-400 mb-4" />
              <h3
                className="text-xl md:text-2xl font-bold uppercase text-white mb-3"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {t.features.worldSpots.title}
              </h3>
              <p
                className="text-base md:text-lg text-teal-200 mb-6 max-w-xl"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {t.features.worldSpots.description}
              </p>
              <Button
                asChild
                variant="outline"
                className="border-2 border-cyan-400 text-cyan-400 rounded-full px-6 py-2 font-bold uppercase text-sm hover:bg-cyan-400/10 hover:text-white hover:border-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <a href="#spots">{t.features.worldSpots.cta}</a>
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

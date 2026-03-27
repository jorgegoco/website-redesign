"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin, ExternalLink, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export interface SpotData {
  rank: number
  name: string
  location: string
  rating: number
  waveType: string
  bestSeason: string
  hazards: string
  foodTip: string
  travelTip: string
}

export function SpotCard({ spot }: { spot: SpotData }) {
  const [expanded, setExpanded] = useState(false)
  const isTop3 = spot.rank <= 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={`bg-white/[0.08] border-white/[0.15] hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 overflow-hidden ${
          isTop3 ? "border-blue-500/20" : ""
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Rank badge */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                  isTop3
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500"
                    : "bg-white/10"
                }`}
              >
                #{spot.rank}
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  {spot.name}
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {spot.location}
                </p>
              </div>
            </div>
            {/* Rating */}
            <Badge variant="outline" className="border-orange-400/30 text-orange-400 font-semibold">
              {spot.rating.toFixed(1)}
            </Badge>
          </div>

          {/* Quick tips */}
          <div className="flex flex-col gap-1 mb-4 text-xs text-gray-500">
            <p>🍽️ {spot.foodTip}</p>
            <p>✈️ {spot.travelTip}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-gray-400 hover:text-white p-0"
            >
              {expanded ? "Less" : "More"}
              <ChevronDown
                className={`h-4 w-4 ml-1 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 text-xs"
            >
              Ask Coach
            </Button>
          </div>

          {/* Expandable details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Separator className="my-4 bg-white/10" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      Wave Type
                    </p>
                    <p className="text-white">{spot.waveType}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      Best Season
                    </p>
                    <p className="text-white">{spot.bestSeason}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      Local Hazards
                    </p>
                    <p className="text-red-400 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {spot.hazards}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Maps <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                  <a
                    href="https://www.windy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Forecast <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

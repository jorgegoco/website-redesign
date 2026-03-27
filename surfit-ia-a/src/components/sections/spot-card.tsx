"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  MapPin,
  ChevronDown,
  Map,
  Waves,
  MessageCircle,
} from "lucide-react"

interface Spot {
  rank: number
  rating: number
  name: string
  location: string
  foodTip: string
  travelTip: string
  waveType: string
  bestSeason: string
  hazards: string
  mapsUrl: string
  forecastUrl: string
}

export default function SpotCard({ spot }: { spot: Spot }) {
  const [expanded, setExpanded] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const isTop3 = spot.rank <= 3

  return (
    <Card
      className={`group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] cursor-pointer ${
        isTop3 ? "border-l-2 border-l-blue-500" : ""
      }`}
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setExpanded(!expanded)
        }
      }}
      aria-expanded={expanded}
      aria-label={`${spot.name}, ranked #${spot.rank}. Click to ${expanded ? "collapse" : "expand"} details.`}
    >
      <div className="p-4 md:p-5">
        {/* Collapsed state */}
        <div className="flex items-start gap-3 md:gap-4">
          {/* Rank badge */}
          <Badge className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 border-0 text-sm font-bold text-white">
            #{spot.rank}
          </Badge>

          <div className="flex-1 min-w-0">
            {/* Name + Rating */}
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-display text-xl md:text-2xl tracking-[0.01em] text-white">
                {spot.name.toUpperCase()}
              </h3>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
                <span className="font-body text-xs font-bold text-orange-400">
                  {spot.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="mt-1 flex items-center gap-1 text-gray-400">
              <MapPin className="h-3 w-3" />
              <span className="font-body text-xs">{spot.location}</span>
            </div>

            {/* Food + Travel tips */}
            <p className="mt-2 font-body text-xs text-gray-500 truncate">
              {spot.foodTip} &middot; {spot.travelTip}
            </p>
          </div>

          {/* Right side: Ask Coach + Chevron */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-blue-400 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              aria-label={`Ask Coach about ${spot.name}`}
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </motion.div>
          </div>
        </div>

        {/* Expanded state */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
              }
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-white/5 pt-4">
                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gray-500 mb-1">
                      Wave Type
                    </p>
                    <p className="font-body text-sm text-white">
                      {spot.waveType}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gray-500 mb-1">
                      Best Season
                    </p>
                    <p className="font-body text-sm text-white">
                      {spot.bestSeason}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gray-500 mb-1">
                      Local Hazards
                    </p>
                    <p className="font-body text-sm text-red-400">
                      {spot.hazards}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-white/10 text-white hover:bg-white/10 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                   
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={spot.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${spot.name} on Maps (opens in new tab)`}
                    >
                      <Map className="mr-1.5 h-3 w-3" />
                      Maps
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-white/10 text-white hover:bg-white/10 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                   
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={spot.forecastUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${spot.name} forecast (opens in new tab)`}
                    >
                      <Waves className="mr-1.5 h-3 w-3" />
                      Forecast
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="ml-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-xs font-semibold uppercase tracking-[0.1em] text-white shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(6,182,212,0.25)] hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    aria-label={`Ask Coach about ${spot.name}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle className="mr-1.5 h-3 w-3" />
                    Ask Coach
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}

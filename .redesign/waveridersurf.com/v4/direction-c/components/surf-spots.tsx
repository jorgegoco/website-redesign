"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Star,
  ChevronDown,
  MapPin,
  ExternalLink,
  AlertTriangle,
  Utensils,
  Plane,
  Waves,
  Calendar,
} from "lucide-react"

interface Spot {
  rank: number
  name: string
  location: string
  rating: number
  waveType: string
  bestSeason: string
  foodTip: string
  travelTip: string
  hazards: string[]
  mapsUrl: string
  forecastUrl: string
}

const spots: Spot[] = [
  {
    rank: 1,
    name: "Pipeline",
    location: "Oahu, Hawaii",
    rating: 5.0,
    waveType: "Hollow Reef Break",
    bestSeason: "Nov-Feb",
    foodTip: "Giovanni Pastrami sandwich",
    travelTip: "Rent car at HNL",
    hazards: ["Shallow reef", "Strong currents"],
    mapsUrl: "https://www.google.com/maps",
    forecastUrl: "https://www.surfline.com",
  },
  {
    rank: 2,
    name: "Teahupo'o",
    location: "Tahiti, French Polynesia",
    rating: 5.0,
    waveType: "Heavy Slab",
    bestSeason: "May-Aug",
    foodTip: "Poisson cru at local roulotte",
    travelTip: "Fly PPT, boat to spot",
    hazards: ["Extremely heavy wave", "Sharp reef"],
    mapsUrl: "https://www.google.com/maps",
    forecastUrl: "https://www.surfline.com",
  },
  {
    rank: 3,
    name: "Uluwatu",
    location: "Bali, Indonesia",
    rating: 4.9,
    waveType: "Long Left Reef Break",
    bestSeason: "Apr-Oct",
    foodTip: "Nasi goreng at Single Fin",
    travelTip: "Fly DPS, scooter rental",
    hazards: ["Sea urchins", "Cave entry"],
    mapsUrl: "https://www.google.com/maps",
    forecastUrl: "https://www.surfline.com",
  },
  {
    rank: 4,
    name: "Jeffreys Bay",
    location: "Eastern Cape, South Africa",
    rating: 4.9,
    waveType: "Long Right Point Break",
    bestSeason: "Jun-Aug",
    foodTip: "Biltong at InFood",
    travelTip: "Fly PLZ, 1hr drive",
    hazards: ["Sharks", "Localism"],
    mapsUrl: "https://www.google.com/maps",
    forecastUrl: "https://www.surfline.com",
  },
  {
    rank: 5,
    name: "Cloud 9",
    location: "Siargao, Philippines",
    rating: 4.8,
    waveType: "Hollow Right Reef Break",
    bestSeason: "Sep-Nov",
    foodTip: "Kinilaw at Bravo",
    travelTip: "Fly IAO, tricycle ride",
    hazards: ["Sharp reef", "Strong currents"],
    mapsUrl: "https://www.google.com/maps",
    forecastUrl: "https://www.surfline.com",
  },
  {
    rank: 6,
    name: "Mavericks",
    location: "California, USA",
    rating: 4.8,
    waveType: "Big Wave Reef Break",
    bestSeason: "Nov-Mar",
    foodTip: "Clam chowder at Sam's",
    travelTip: "Fly SFO, 45min drive south",
    hazards: ["Giant waves", "Cold water", "Rocks"],
    mapsUrl: "https://www.google.com/maps",
    forecastUrl: "https://www.surfline.com",
  },
  {
    rank: 7,
    name: "Nazare",
    location: "Leiria, Portugal",
    rating: 4.8,
    waveType: "Giant Beach Break",
    bestSeason: "Oct-Mar",
    foodTip: "Caldeirada at Celeste",
    travelTip: "Fly LIS, 1.5hr drive north",
    hazards: ["Largest waves on earth", "Currents"],
    mapsUrl: "https://www.google.com/maps",
    forecastUrl: "https://www.surfline.com",
  },
  {
    rank: 8,
    name: "Gold Coast",
    location: "Queensland, Australia",
    rating: 4.7,
    waveType: "Long Right Point Break",
    bestSeason: "Feb-May",
    foodTip: "Fish & chips at Peter's",
    travelTip: "Fly OOL, bus to Snapper",
    hazards: ["Strong currents", "Bluebottles"],
    mapsUrl: "https://www.google.com/maps",
    forecastUrl: "https://www.surfline.com",
  },
  {
    rank: 9,
    name: "Puerto Escondido",
    location: "Oaxaca, Mexico",
    rating: 4.7,
    waveType: "Heavy Beach Break",
    bestSeason: "May-Aug",
    foodTip: "Tlayuda at Zandunga",
    travelTip: "Fly PXM, taxi to Zicatela",
    hazards: ["Mexican Pipeline", "Powerful shorebreak"],
    mapsUrl: "https://www.google.com/maps",
    forecastUrl: "https://www.surfline.com",
  },
  {
    rank: 10,
    name: "Hossegor",
    location: "Landes, France",
    rating: 4.7,
    waveType: "Hollow Beach Break",
    bestSeason: "Sep-Nov",
    foodTip: "Duck confit at Jean des Sables",
    travelTip: "Fly BIQ, 20min drive",
    hazards: ["Strong rip currents", "Shifting banks"],
    mapsUrl: "https://www.google.com/maps",
    forecastUrl: "https://www.surfline.com",
  },
]

function getRankColor(rank: number) {
  if (rank <= 3) return "text-yellow-400"
  if (rank <= 7) return "text-cyan-400"
  return "text-teal-300"
}

function getCardStyle(rank: number) {
  if (rank <= 3)
    return "border-l-4 border-l-yellow-400 bg-gradient-to-r from-yellow-400/10 to-transparent"
  if (rank <= 7) return "border-l-4 border-l-cyan-400 bg-cyan-950"
  return "border-l-4 border-l-teal-600 bg-teal-900"
}

const rowVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const topRowVariants = {
  hidden: { opacity: 0, x: -100, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const sectionHeading = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function SurfSpots() {
  const [expanded, setExpanded] = useState<number | null>(null)

  const toggleExpand = (rank: number) => {
    setExpanded(expanded === rank ? null : rank)
  }

  return (
    <TooltipProvider>
      <section
        id="spots"
        className="relative py-20 md:py-28 bg-teal-950"
        aria-label="Top 10 World Surf Spots"
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(34,211,238,0.5) 10px, rgba(34,211,238,0.5) 11px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={sectionHeading}
            className="mb-12"
          >
            <p
              className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-yellow-400 mb-4"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              CURATED BY ELITE WAVE HUNTERS
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-2"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Top 10 World Surf Spots
            </h2>
            <p
              className="text-lg md:text-xl text-teal-200"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              The definitive ranking for serious surfers
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {spots.map((spot) => {
              const isExpanded = expanded === spot.rank
              const variants = spot.rank <= 3 ? topRowVariants : rowVariants

              return (
                <motion.div
                  key={spot.rank}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={spot.rank - 1}
                  variants={variants}
                  layout
                >
                  <Card
                    className={`${getCardStyle(spot.rank)} border border-white/5 rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-200 group cursor-pointer`}
                    onClick={() => toggleExpand(spot.rank)}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-label={`${spot.name}, ranked number ${spot.rank}`}
                  >
                    <div className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                      {/* Rank */}
                      <div className="flex-shrink-0 w-12 md:w-16">
                        <span
                          className={`text-4xl md:text-5xl font-black ${getRankColor(spot.rank)} group-hover:scale-110 inline-block transition-transform duration-200`}
                          style={{ fontFamily: "Outfit, sans-serif" }}
                        >
                          {spot.rank}
                        </span>
                      </div>

                      {/* Name + Location */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-xl md:text-2xl font-bold uppercase text-white"
                          style={{ fontFamily: "Outfit, sans-serif" }}
                        >
                          {spot.name}
                        </h3>
                        <p
                          className="text-base text-teal-200 flex items-center gap-1"
                          style={{ fontFamily: "DM Sans, sans-serif" }}
                        >
                          <MapPin className="h-3.5 w-3.5" />
                          {spot.location}
                        </p>
                      </div>

                      {/* Rating + Wave Type */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span
                            className="text-sm font-bold text-yellow-400"
                            style={{ fontFamily: "Outfit, sans-serif" }}
                          >
                            {spot.rating.toFixed(1)}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-cyan-400/10 text-cyan-400 border-cyan-400/20 rounded-full text-xs"
                        >
                          {spot.waveType}
                        </Badge>
                      </div>

                      {/* Season + Tips (hidden on mobile) */}
                      <div className="hidden lg:flex flex-col text-sm text-teal-300 flex-shrink-0 max-w-[200px]">
                        <span style={{ fontFamily: "DM Sans, sans-serif" }}>
                          <Calendar className="h-3.5 w-3.5 inline mr-1" />
                          {spot.bestSeason}
                        </span>
                        <span
                          className="truncate"
                          style={{ fontFamily: "DM Sans, sans-serif" }}
                        >
                          <Utensils className="h-3.5 w-3.5 inline mr-1" />
                          {spot.foodTip}
                        </span>
                      </div>

                      {/* Ask Coach + Chevron */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          className="bg-rose-500 text-white rounded-full px-4 py-1.5 text-sm font-bold hover:bg-rose-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Ask Coach about ${spot.name}`}
                        >
                          Ask Coach
                        </Button>
                        <ChevronDown
                          className={`h-5 w-5 text-teal-300 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                          animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
                          exit={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          <div className="bg-teal-900 rounded-b-2xl p-6 border-t border-white/5">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2, duration: 0.3 }}
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div>
                                  <p
                                    className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-2"
                                    style={{ fontFamily: "Outfit, sans-serif" }}
                                  >
                                    <Waves className="h-3.5 w-3.5 inline mr-1" />
                                    Wave Type
                                  </p>
                                  <p
                                    className="text-base text-white"
                                    style={{ fontFamily: "DM Sans, sans-serif" }}
                                  >
                                    {spot.waveType}
                                  </p>
                                </div>
                                <div>
                                  <p
                                    className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-2"
                                    style={{ fontFamily: "Outfit, sans-serif" }}
                                  >
                                    <Calendar className="h-3.5 w-3.5 inline mr-1" />
                                    Best Season
                                  </p>
                                  <p
                                    className="text-base text-white"
                                    style={{ fontFamily: "DM Sans, sans-serif" }}
                                  >
                                    {spot.bestSeason}
                                  </p>
                                </div>
                                <div>
                                  <p
                                    className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-2"
                                    style={{ fontFamily: "Outfit, sans-serif" }}
                                  >
                                    <AlertTriangle className="h-3.5 w-3.5 inline mr-1" />
                                    Local Hazards
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {spot.hazards.map((hazard) => (
                                      <Badge
                                        key={hazard}
                                        variant="outline"
                                        className="bg-rose-500/10 text-rose-400 border-rose-500/20 rounded-full text-xs"
                                      >
                                        {hazard}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p
                                    className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-2"
                                    style={{ fontFamily: "Outfit, sans-serif" }}
                                  >
                                    <Utensils className="h-3.5 w-3.5 inline mr-1" />
                                    Food Tip
                                  </p>
                                  <p
                                    className="text-base text-teal-200"
                                    style={{ fontFamily: "DM Sans, sans-serif" }}
                                  >
                                    {spot.foodTip}
                                  </p>
                                </div>
                                <div>
                                  <p
                                    className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-2"
                                    style={{ fontFamily: "Outfit, sans-serif" }}
                                  >
                                    <Plane className="h-3.5 w-3.5 inline mr-1" />
                                    Travel Tip
                                  </p>
                                  <p
                                    className="text-base text-teal-200"
                                    style={{ fontFamily: "DM Sans, sans-serif" }}
                                  >
                                    {spot.travelTip}
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-4 pt-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={spot.mapsUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-cyan-400 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950 rounded"
                                      onClick={(e) => e.stopPropagation()}
                                      aria-label={`View ${spot.name} on Google Maps (opens in new tab)`}
                                    >
                                      <MapPin className="h-4 w-4" />
                                      Google Maps
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Open in Google Maps</p>
                                  </TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={spot.forecastUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-cyan-400 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950 rounded"
                                      onClick={(e) => e.stopPropagation()}
                                      aria-label={`View ${spot.name} forecast on Surfline (opens in new tab)`}
                                    >
                                      <Waves className="h-4 w-4" />
                                      Surfline Forecast
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Open Surfline forecast</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}

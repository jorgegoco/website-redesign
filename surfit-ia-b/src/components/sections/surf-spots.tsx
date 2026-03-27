"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  ChevronDown,
  MessageCircle,
  MapPin,
  ExternalLink,
} from "lucide-react"

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

interface Spot {
  rank: number
  name: string
  location: string
  rating: number
  waveType: string
  bestSeason: string
  hazards: string
  foodTip: string
  travelTip: string
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
    hazards: "Shallow reef, strong currents, crowds",
    foodTip: "Try poke bowls at North Shore food trucks",
    travelTip: "Fly into Honolulu, rent a car to North Shore",
    mapsUrl: "https://www.google.com/maps/place/Pipeline",
    forecastUrl: "https://www.surfline.com/surf-report/pipeline",
  },
  {
    rank: 2,
    name: "Teahupo'o",
    location: "Tahiti, French Polynesia",
    rating: 5.0,
    waveType: "Heavy Slab",
    bestSeason: "May-Aug",
    hazards: "Extremely shallow reef, powerful waves",
    foodTip: "Fresh poisson cru from local market",
    travelTip: "Fly to Papeete, boat transfer to Teahupo'o",
    mapsUrl: "https://www.google.com/maps/place/Teahupoo",
    forecastUrl: "https://www.surfline.com/surf-report/teahupoo",
  },
  {
    rank: 3,
    name: "Uluwatu",
    location: "Bali, Indonesia",
    rating: 4.9,
    waveType: "Long Left Reef Break",
    bestSeason: "Apr-Oct",
    hazards: "Sharp reef, cave entry, strong currents",
    foodTip: "Nasi goreng at cliffside warungs",
    travelTip: "Fly to Denpasar, 30min drive to Uluwatu",
    mapsUrl: "https://www.google.com/maps/place/Uluwatu",
    forecastUrl: "https://www.surfline.com/surf-report/uluwatu",
  },
  {
    rank: 4,
    name: "Jeffreys Bay",
    location: "Eastern Cape, South Africa",
    rating: 4.9,
    waveType: "Long Right Point Break",
    bestSeason: "Jun-Aug",
    hazards: "Sharks, cold water, rocky entry",
    foodTip: "Biltong and craft beer in town",
    travelTip: "Fly to Port Elizabeth, 1hr drive to J-Bay",
    mapsUrl: "https://www.google.com/maps/place/Jeffreys+Bay",
    forecastUrl: "https://www.surfline.com/surf-report/jeffreys-bay",
  },
  {
    rank: 5,
    name: "Cloud 9",
    location: "Siargao, Philippines",
    rating: 4.8,
    waveType: "Hollow Right Reef Break",
    bestSeason: "Sep-Nov",
    hazards: "Shallow reef, strong currents, sea urchins",
    foodTip: "Fresh seafood at beachfront grills",
    travelTip: "Fly to Siargao via Cebu or Manila",
    mapsUrl: "https://www.google.com/maps/place/Cloud+9+Siargao",
    forecastUrl: "https://www.surfline.com/surf-report/cloud-9",
  },
  {
    rank: 6,
    name: "Mavericks",
    location: "California, USA",
    rating: 4.8,
    waveType: "Big Wave Reef Break",
    bestSeason: "Nov-Mar",
    hazards: "Giant waves, cold water, rocks, sharks",
    foodTip: "Clam chowder at Half Moon Bay",
    travelTip: "Fly to SFO, 45min drive south to Half Moon Bay",
    mapsUrl: "https://www.google.com/maps/place/Mavericks",
    forecastUrl: "https://www.surfline.com/surf-report/mavericks",
  },
  {
    rank: 7,
    name: "Nazare",
    location: "Leiria, Portugal",
    rating: 4.9,
    waveType: "Giant Beach Break",
    bestSeason: "Oct-Mar",
    hazards: "Record-breaking waves, strong currents",
    foodTip: "Caldeirada de peixe in the harbor",
    travelTip: "Fly to Lisbon, 1.5hr drive north",
    mapsUrl: "https://www.google.com/maps/place/Nazare",
    forecastUrl: "https://www.surfline.com/surf-report/nazare",
  },
  {
    rank: 8,
    name: "Gold Coast",
    location: "Queensland, Australia",
    rating: 4.7,
    waveType: "Long Right Point Break",
    bestSeason: "Feb-May",
    hazards: "Crowds, bluebottles, sand shifts",
    foodTip: "Fish and chips at Burleigh Heads",
    travelTip: "Fly to Gold Coast Airport, Snapper Rocks nearby",
    mapsUrl: "https://www.google.com/maps/place/Gold+Coast",
    forecastUrl: "https://www.surfline.com/surf-report/gold-coast",
  },
  {
    rank: 9,
    name: "Puerto Escondido",
    location: "Oaxaca, Mexico",
    rating: 4.8,
    waveType: "Heavy Beach Break",
    bestSeason: "May-Aug",
    hazards: "Powerful shorebreak, strong rip currents",
    foodTip: "Tlayudas and mezcal at Zicatela",
    travelTip: "Fly to Puerto Escondido, beaches walking distance",
    mapsUrl: "https://www.google.com/maps/place/Puerto+Escondido",
    forecastUrl: "https://www.surfline.com/surf-report/puerto-escondido",
  },
  {
    rank: 10,
    name: "Hossegor",
    location: "Landes, France",
    rating: 4.7,
    waveType: "Hollow Beach Break",
    bestSeason: "Sep-Nov",
    hazards: "Powerful shorebreak, shifting sandbars",
    foodTip: "Duck confit and local wine in town",
    travelTip: "Fly to Biarritz, 30min drive north",
    mapsUrl: "https://www.google.com/maps/place/Hossegor",
    forecastUrl: "https://www.surfline.com/surf-report/hossegor",
  },
]

function SpotRow({ spot, index }: { spot: Spot; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const isTop3 = spot.rank <= 3

  return (
    <Card
      className="bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors duration-200 overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 md:p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        aria-expanded={expanded}
        aria-label={`${spot.name}, ${spot.location}, ranked #${spot.rank}`}
      >
        {/* Desktop layout */}
        <div className="hidden md:flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
              isTop3
                ? "bg-gradient-to-br from-indigo-500 to-emerald-500 text-white"
                : "bg-zinc-800 text-slate-400 border border-zinc-700"
            }`}
          >
            #{spot.rank}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h3
                className="text-lg font-semibold text-slate-50"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {spot.name}
              </h3>
              <span
                className="text-sm text-slate-500"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {spot.location}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge className="bg-zinc-800 text-slate-300 rounded-md text-xs px-2 py-0.5 hover:bg-zinc-800">
                {spot.waveType}
              </Badge>
              <Badge className="bg-zinc-800 text-slate-300 rounded-md text-xs px-2 py-0.5 hover:bg-zinc-800">
                {spot.bestSeason}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span
                className="text-sm font-semibold text-amber-500"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {spot.rating.toFixed(1)}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-zinc-700 text-slate-400 hover:border-zinc-600 hover:text-slate-200 transition-colors duration-150 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Ask Coach about ${spot.name}`}
            >
              <MessageCircle className="mr-1 h-3 w-3" />
              Ask Coach
            </Button>
            <ChevronDown
              className={`h-5 w-5 text-slate-500 transition-transform duration-200 ease-out ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  isTop3
                    ? "bg-gradient-to-br from-indigo-500 to-emerald-500 text-white"
                    : "bg-zinc-800 text-slate-400 border border-zinc-700"
                }`}
              >
                #{spot.rank}
              </div>
              <h3
                className="text-lg font-semibold text-slate-50"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {spot.name}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-amber-500">
                {spot.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-500" style={{ fontFamily: "Inter, sans-serif" }}>
            {spot.location}
          </p>
          <div className="flex items-center gap-2">
            <Badge className="bg-zinc-800 text-slate-300 rounded-md text-xs px-2 py-0.5 hover:bg-zinc-800">
              {spot.waveType}
            </Badge>
            <Badge className="bg-zinc-800 text-slate-300 rounded-md text-xs px-2 py-0.5 hover:bg-zinc-800">
              {spot.bestSeason}
            </Badge>
          </div>
          <div className="flex items-center justify-between pt-1">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-zinc-700 text-slate-400 hover:border-zinc-600 hover:text-slate-200 transition-colors duration-150 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Ask Coach about ${spot.name}`}
            >
              <MessageCircle className="mr-1 h-3 w-3" />
              Ask Coach
            </Button>
            <ChevronDown
              className={`h-5 w-5 text-slate-500 transition-transform duration-200 ease-out ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="border-t border-zinc-800 px-5 md:px-6 pb-5 md:pb-6 pt-4 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Local Food
                  </p>
                  <p className="text-sm text-slate-300" style={{ fontFamily: "Inter, sans-serif" }}>
                    {spot.foodTip}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Travel Tip
                  </p>
                  <p className="text-sm text-slate-300" style={{ fontFamily: "Inter, sans-serif" }}>
                    {spot.travelTip}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Hazards
                  </p>
                  <p className="text-sm text-red-400" style={{ fontFamily: "Inter, sans-serif" }}>
                    {spot.hazards}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Links
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-zinc-700 text-slate-400 hover:border-zinc-600 hover:text-slate-200 transition-colors duration-150 rounded-lg w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                     
                    >
                      <a
                        href={spot.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Google Maps for ${spot.name}`}
                      >
                        <MapPin className="mr-1 h-3 w-3" />
                        Maps
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-zinc-700 text-slate-400 hover:border-zinc-600 hover:text-slate-200 transition-colors duration-150 rounded-lg w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                     
                    >
                      <a
                        href={spot.forecastUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Surf forecast for ${spot.name}`}
                      >
                        Forecast
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default function SurfSpots() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="spots"
      aria-label="Top 10 World Surf Spots"
      className="bg-zinc-950 py-24 md:py-32"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease }}
          className="mb-10"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.1em] text-indigo-400 mb-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Curated Data
          </p>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-50 tracking-[-0.02em] mb-3"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Top 10 World Surf Spots
          </h2>
          <p
            className="text-base md:text-lg text-slate-400"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Ranked by elite wave hunters. Real conditions, real data.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="space-y-3"
        >
          {spots.map((spot, index) => (
            <motion.div
              key={spot.rank}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease },
                },
              }}
            >
              <SpotRow spot={spot} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

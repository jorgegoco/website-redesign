"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import SpotCard from "./spot-card"
import { useLanguage } from "@/contexts/language-context"

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

const spots: Spot[] = [
  {
    rank: 1,
    rating: 5.0,
    name: "Pipeline",
    location: "Oahu, Hawaii",
    foodTip: "Fresh Poke Bowls at Kahuku Supermarket",
    travelTip: "The ultimate proving ground. Winter is for pros.",
    waveType: "Hollow Reef Break",
    bestSeason: "November - February",
    hazards: "Shallow reef, extreme crowds, heavy localism",
    mapsUrl: "https://www.google.com/maps/place/Pipeline",
    forecastUrl: "https://www.surfline.com/surf-report/pipeline",
  },
  {
    rank: 2,
    rating: 5.0,
    name: "Teahupo'o",
    location: "Tahiti, French Polynesia",
    foodTip: "Poisson Cru (Raw fish with coconut milk)",
    travelTip: "End of the road. Take a taxi boat to watch safely.",
    waveType: "Heavy Slab / Reef Break",
    bestSeason: "May - August",
    hazards: "Extremely shallow reef, heavy lip, remote location",
    mapsUrl: "https://www.google.com/maps/place/Teahupoo",
    forecastUrl: "https://www.surfline.com/surf-report/teahupoo",
  },
  {
    rank: 3,
    rating: 4.9,
    name: "Uluwatu",
    location: "Bali, Indonesia",
    foodTip: "Nasi Goreng at the cliffside warungs",
    travelTip: "Spiritual center. Rent a scooter to explore the Bukit.",
    waveType: "Long Left Reef Break",
    bestSeason: "April - October",
    hazards: "Sharp reef, strong currents, cave entry/exit",
    mapsUrl: "https://www.google.com/maps/place/Uluwatu",
    forecastUrl: "https://www.surfline.com/surf-report/uluwatu",
  },
  {
    rank: 4,
    rating: 4.9,
    name: "Jeffreys Bay",
    location: "Eastern Cape, South Africa",
    foodTip: "Braai (BBQ) and fresh calamari",
    travelTip: "Endless right handers. Visit Addo Elephant Park nearby.",
    waveType: "Long Right Point Break",
    bestSeason: "June - August",
    hazards: "Sharks, cold water, long paddle outs",
    mapsUrl: "https://www.google.com/maps/place/Jeffreys+Bay",
    forecastUrl: "https://www.surfline.com/surf-report/jeffreys-bay",
  },
  {
    rank: 5,
    rating: 4.8,
    name: "Cloud 9",
    location: "Siargao, Philippines",
    foodTip: "Kinilaw and sweet island mangoes",
    travelTip: "Tropical paradise. Island hopping is a must.",
    waveType: "Hollow Right Reef Break",
    bestSeason: "September - November",
    hazards: "Sharp reef, shallow at low tide, crowds",
    mapsUrl: "https://www.google.com/maps/place/Cloud+9+Siargao",
    forecastUrl: "https://www.surfline.com/surf-report/cloud-9",
  },
  {
    rank: 6,
    rating: 4.8,
    name: "Mavericks",
    location: "California, USA",
    foodTip: "Clam Chowder at Half Moon Bay Brewing",
    travelTip: "Cold, heavy water. Watch from the cliffs during swells.",
    waveType: "Big Wave Reef Break",
    bestSeason: "November - March",
    hazards: "Extreme size, cold water, rocks, sharks",
    mapsUrl: "https://www.google.com/maps/place/Mavericks",
    forecastUrl: "https://www.surfline.com/surf-report/mavericks",
  },
  {
    rank: 7,
    rating: 5.0,
    name: "Nazare",
    location: "Leiria, Portugal",
    foodTip: "Grilled Sardines and Vinho Verde",
    travelTip: "Home of giants. Visit the Fort of Sao Miguel Arcanjo.",
    waveType: "Giant Beach Break",
    bestSeason: "October - March",
    hazards: "Extreme size, heavy currents, jet ski traffic",
    mapsUrl: "https://www.google.com/maps/place/Nazare",
    forecastUrl: "https://www.surfline.com/surf-report/nazare",
  },
  {
    rank: 8,
    rating: 4.7,
    name: "Gold Coast",
    location: "Queensland, Australia",
    foodTip: "Aussie Meat Pies and Flat Whites",
    travelTip: "The Superbank. Surfers Paradise nightlife is legendary.",
    waveType: "Long Right Point Break",
    bestSeason: "February - May",
    hazards: "Extreme crowds, sharks, strong sweep",
    mapsUrl: "https://www.google.com/maps/place/Gold+Coast",
    forecastUrl: "https://www.surfline.com/surf-report/gold-coast",
  },
  {
    rank: 9,
    rating: 4.8,
    name: "Puerto Escondido",
    location: "Oaxaca, Mexico",
    foodTip: "Fish Tacos and Oaxacan Mezcal",
    travelTip: "Mexican Pipeline. Great for advanced tubers and sunset lovers.",
    waveType: "Heavy Beach Break",
    bestSeason: "May - August",
    hazards: "Heavy currents, broken boards, dangerous shorebreak",
    mapsUrl: "https://www.google.com/maps/place/Puerto+Escondido",
    forecastUrl: "https://www.surfline.com/surf-report/puerto-escondido",
  },
  {
    rank: 10,
    rating: 4.8,
    name: "Hossegor",
    location: "Landes, France",
    foodTip: "Fresh Croissants and Bordeaux Wine",
    travelTip: "European surf capital. Best sandbars in the world.",
    waveType: "Hollow Beach Break",
    bestSeason: "September - November",
    hazards: "Heavy shorebreak, strong currents, shifting peaks",
    mapsUrl: "https://www.google.com/maps/place/Hossegor",
    forecastUrl: "https://www.surfline.com/surf-report/hossegor",
  },
]

export default function SurfSpots() {
  const prefersReducedMotion = useReducedMotion()
  const { t } = useLanguage()

  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 40 },
    whileInView: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: prefersReducedMotion
      ? {}
      : { duration: 0.7, delay, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  })

  return (
    <section
      id="spots"
      className="py-24 md:py-36 px-4"
      aria-label="Top 10 World Surf Spots"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              {...fadeUp(0)}
              className="mb-4 font-body text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-cyan-500"
            >
              {t.spots.label}
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[0.02em] text-white"
            >
              {t.spots.heading}
            </motion.h2>
          </div>
          <motion.div {...fadeUp(0.2)}>
            <Button
              asChild
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-white/5 text-sm uppercase tracking-[0.1em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <a href="#spots">View All</a>
            </Button>
          </motion.div>
        </div>

        {/* Spots grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {spots.map((spot, i) => (
            <motion.div
              key={spot.name}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                prefersReducedMotion
                  ? {}
                  : { duration: 0.5, delay: i * 0.08, ease: "easeOut" }
              }
            >
              <SpotCard spot={spot} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { SpotCard, type SpotData } from "./spot-card"

const spots: SpotData[] = [
  {
    rank: 1,
    name: "Pipeline",
    location: "Oahu, Hawaii",
    rating: 5.0,
    waveType: "Hollow Reef Break",
    bestSeason: "Nov–Feb",
    hazards: "Shallow reef, strong currents",
    foodTip: "Try the garlic shrimp trucks on the North Shore",
    travelTip: "Fly into Honolulu, rent a car to the North Shore",
  },
  {
    rank: 2,
    name: "Teahupo'o",
    location: "Tahiti, French Polynesia",
    rating: 5.0,
    waveType: "Heavy Slab",
    bestSeason: "May–Aug",
    hazards: "Extremely shallow reef, powerful waves",
    foodTip: "Fresh poisson cru at local roulottes",
    travelTip: "Fly to Papeete, boat to the break",
  },
  {
    rank: 3,
    name: "Uluwatu",
    location: "Bali, Indonesia",
    rating: 4.9,
    waveType: "Long Left Reef Break",
    bestSeason: "Apr–Oct",
    hazards: "Sharp reef, cave entry/exit",
    foodTip: "Nasi goreng at the cliffside warungs",
    travelTip: "Fly into Denpasar, stay in Pecatu or Bingin",
  },
  {
    rank: 4,
    name: "Jeffreys Bay",
    location: "Eastern Cape, South Africa",
    rating: 4.9,
    waveType: "Long Right Point Break",
    bestSeason: "Jun–Aug",
    hazards: "Sharks, cold water",
    foodTip: "Biltong and braai at the local markets",
    travelTip: "Fly to Port Elizabeth, drive 1 hour to J-Bay",
  },
  {
    rank: 5,
    name: "Cloud 9",
    location: "Siargao, Philippines",
    rating: 4.8,
    waveType: "Hollow Right Reef Break",
    bestSeason: "Sep–Nov",
    hazards: "Shallow reef, sea urchins",
    foodTip: "Fresh kinilaw (ceviche) from local fishermen",
    travelTip: "Fly to Siargao, stay in General Luna",
  },
  {
    rank: 6,
    name: "Mavericks",
    location: "California, USA",
    rating: 4.8,
    waveType: "Big Wave Reef Break",
    bestSeason: "Nov–Mar",
    hazards: "Massive waves, freezing water, rocks",
    foodTip: "Clam chowder in Half Moon Bay",
    travelTip: "Fly to SFO, drive south 30 min",
  },
  {
    rank: 7,
    name: "Nazaré",
    location: "Leiria, Portugal",
    rating: 4.8,
    waveType: "Giant Beach Break",
    bestSeason: "Oct–Mar",
    hazards: "World-record waves, unpredictable currents",
    foodTip: "Caldeirada de peixe (fish stew) on the harbor",
    travelTip: "Fly to Lisbon, drive north 1.5 hours",
  },
  {
    rank: 8,
    name: "Gold Coast",
    location: "Queensland, Australia",
    rating: 4.7,
    waveType: "Long Right Point Break",
    bestSeason: "Feb–May",
    hazards: "Crowds, occasional bluebottles",
    foodTip: "Fish and chips at Snapper Rocks cafe",
    travelTip: "Fly to Gold Coast Airport, stay in Coolangatta",
  },
  {
    rank: 9,
    name: "Puerto Escondido",
    location: "Oaxaca, Mexico",
    rating: 4.7,
    waveType: "Heavy Beach Break",
    bestSeason: "May–Aug",
    hazards: "Powerful shorebreak, strong undertow",
    foodTip: "Tlayudas and mezcal from Oaxacan markets",
    travelTip: "Fly to Puerto Escondido, stay near Zicatela beach",
  },
  {
    rank: 10,
    name: "Hossegor",
    location: "Landes, France",
    rating: 4.7,
    waveType: "Hollow Beach Break",
    bestSeason: "Sep–Nov",
    hazards: "Strong rips, shifting sandbars",
    foodTip: "Oysters and white wine in Cap Ferret",
    travelTip: "Fly to Biarritz or Bordeaux, drive to Hossegor",
  },
]

export function SurfSpots() {
  return (
    <section id="spots" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-4">
          Curated by Elite Wave Hunters
        </p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Top 10 World Surf Spots
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spots.map((spot) => (
          <SpotCard key={spot.rank} spot={spot} />
        ))}
      </div>
    </section>
  )
}

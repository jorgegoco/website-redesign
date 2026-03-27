"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SpotCard, { type SpotData } from "./spot-card";

const spots: SpotData[] = [
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
  },
  {
    rank: 7,
    rating: 5.0,
    name: "Nazaré",
    location: "Leiria, Portugal",
    foodTip: "Grilled Sardines and Vinho Verde",
    travelTip: "Home of giants. Visit the Fort of São Miguel Arcanjo.",
    waveType: "Giant Beach Break",
    bestSeason: "October - March",
    hazards: "Extreme size, heavy currents, jet ski traffic",
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
  },
];

export default function SurfSpots() {
  return (
    <section id="spots" className="py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-3">
              Curated by Elite Wave Hunters
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
              Top 10 World Surf Spots
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-cyan-500 rounded-none pb-1"
            >
              View All
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {spots.map((spot, i) => (
            <SpotCard key={spot.name} spot={spot} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

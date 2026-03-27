"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  MessageCircle,
  Map,
  Waves,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SpotData {
  rank: number;
  rating: number;
  name: string;
  location: string;
  foodTip: string;
  travelTip: string;
  waveType: string;
  bestSeason: string;
  hazards: string;
}

export default function SpotCard({
  spot,
  index,
}: {
  spot: SpotData;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 overflow-hidden cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  #{spot.rank}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-lg font-semibold text-white font-heading truncate">
                    {spot.name}
                  </h3>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <Star className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />
                    <span className="text-xs font-bold text-orange-400">
                      {spot.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="text-xs truncate">{spot.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row gap-2 text-xs text-gray-500">
            <span className="truncate">🍽 {spot.foodTip}</span>
            <span className="hidden sm:inline">·</span>
            <span className="truncate">💡 {spot.travelTip}</span>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2 border-t border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500 mb-1">
                      Wave Type
                    </p>
                    <p className="text-sm text-white">{spot.waveType}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500 mb-1">
                      Best Season
                    </p>
                    <p className="text-sm text-white">{spot.bestSeason}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500 mb-1">
                      Local Hazards
                    </p>
                    <p className="text-sm text-red-400">{spot.hazards}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10 rounded-full text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Map className="h-3.5 w-3.5 mr-1.5" />
                    Maps
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10 rounded-full text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Waves className="h-3.5 w-3.5 mr-1.5" />
                    Forecast
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full text-xs ml-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                    Ask Coach
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const sections = [
  { id: "hero", label: "Hero" },
  { id: "features", label: "Features" },
  { id: "adventures", label: "Adventures" },
  { id: "spots", label: "Spots" },
  { id: "footer", label: "Footer" },
]

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileOpen, setMobileOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const activeLabelText = sections.find((s) => s.id === activeSection)?.label ?? ""

  return (
    <>
      {/* Desktop: vertical dot nav on right */}
      <TooltipProvider delay={300}>
        <nav
          className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
          aria-label="Section navigation"
        >
          <div className="relative flex flex-col items-center gap-4">
            <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-white/10" aria-hidden="true" />
            {sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <Tooltip key={section.id}>
                  <TooltipTrigger>
                    <a
                      href={`#${section.id}`}
                      className="relative z-10 block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      aria-label={`Go to ${section.label} section`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <motion.div
                        className={`rounded-full transition-colors duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                            : "bg-white/20 hover:bg-white/40"
                        }`}
                        animate={
                          prefersReducedMotion
                            ? {}
                            : { scale: isActive ? 1.5 : 1 }
                        }
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ width: 8, height: 8 }}
                      />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="left"
                    className="rounded-md bg-white/10 px-2 py-1 text-xs font-body text-white backdrop-blur-sm border-0"
                  >
                    {section.label}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </nav>
      </TooltipProvider>

      {/* Mobile: floating pill at bottom-right */}
      <div className="fixed bottom-6 right-4 z-40 lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-body text-white/60 backdrop-blur-xl transition-colors duration-200 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          aria-label="Open section navigation"
          aria-expanded={mobileOpen}
        >
          {activeLabelText}
        </button>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-full right-0 mb-2 flex flex-col items-end gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-xl"
            >
              {sections.map((section) => {
                const isActive = activeSection === section.id
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 text-xs font-body transition-colors duration-200 ${
                      isActive ? "text-white" : "text-white/50 hover:text-white/80"
                    }`}
                    aria-label={`Go to ${section.label} section`}
                  >
                    <span>{section.label}</span>
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                          : "bg-white/20"
                      }`}
                    />
                  </a>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

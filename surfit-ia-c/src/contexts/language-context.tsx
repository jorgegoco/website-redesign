"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Lang = "en" | "es"

const translations = {
  en: {
    nav: {
      aiCoach: "AI Coach",
      spots: "Spots",
      shop: "Shop",
      adventures: "Adventures",
    },
    hero: {
      eyebrow: "AI-POWERED SURF COACHING",
      subheading: "Master the science of surfing with artificial intelligence",
      cta: "Explore Spots",
    },
    toggle: "ES",
  },
  es: {
    nav: {
      aiCoach: "Entrenador IA",
      spots: "Spots",
      shop: "Tienda",
      adventures: "Aventuras",
    },
    hero: {
      eyebrow: "ENTRENAMIENTO DE SURF CON IA",
      subheading: "Domina la ciencia del surf con inteligencia artificial",
      cta: "Explorar Spots",
    },
    toggle: "EN",
  },
}

type Translations = typeof translations.en

interface LanguageContextType {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: translations.en,
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  const toggleLang = () => setLang((l) => (l === "en" ? "es" : "en"))
  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle: toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)

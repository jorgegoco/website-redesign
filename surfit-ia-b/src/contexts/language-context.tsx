"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Lang = "en" | "es"

const translations = {
  en: {
    nav: {
      aiCoach: "AI Coach",
      features: "Features",
      spots: "Spots",
      adventures: "Adventures",
    },
    hero: {
      eyebrow: "AI-Powered Surf Coaching",
      subheading: "Master the science of surfing with artificial intelligence",
      cta: "Explore Top 10 Spots",
    },
    toggle: "ES",
  },
  es: {
    nav: {
      aiCoach: "Entrenador IA",
      features: "Funciones",
      spots: "Spots",
      adventures: "Aventuras",
    },
    hero: {
      eyebrow: "Entrenamiento de Surf con IA",
      subheading: "Domina la ciencia del surf con inteligencia artificial",
      cta: "Explorar Top 10 Spots",
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

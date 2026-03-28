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
    aiCoach: {
      label: "HERO FEATURE",
      heading: "AI Surf Coach",
      subheading: "Biomechanical Analysis",
      description: "Upload your surf photo and get instant AI feedback on stance, rail work, and gaze direction. Powered by computer vision trained on professional surfers.",
      comingSoon: "Coming soon — upload feature requires app account",
    },
    features: {
      label: "EXPLORE",
      heading: "Features & Tools",
      mediaGallery: "Media Gallery",
      tabs: { images: "Surf Images", videos: "Videos" },
      imageDesc: "Browse curated surf photography from the world's best breaks.",
      videoDesc: "Watch the best surf highlights and trick breakdowns.",
      galleryAvailable: "Gallery available in the app",
      videosAvailable: "Videos available in the app",
      surfShop: {
        title: "Surf Shop",
        description: "Discover the 10 best surf shops online. Best prices, premium boards, and wetsuits in Europe & World.",
      },
      shopSoon: "Shop list coming soon",
      googleTravel: {
        title: "Google Travel Surf",
        description: "Explore the best surf trips and prices to blue destinations worldwide via Google Travel.",
        cta: "BOOK TRIP",
      },
      worldSpots: {
        title: "World Spot Gallery",
        description: "Explore panoramic photos and the best locations where surfing happens globally.",
        cta: "VIEW SPOTS",
      },
    },
    adventure: {
      label: "BEST TRIPS & VIDEOS",
      heading: "Adventure & Advice",
      watchTrips: "Watch Best Trips",
      youtubeCurated: "YouTube Curated List",
    },
    spots: {
      label: "CURATED BY ELITE WAVE HUNTERS",
      heading: "Top 10 World Surf Spots",
      subtitle: "The definitive ranking of the world's greatest waves.",
    },
    footer: {
      tagline: "AI-powered surf coaching and wave guide",
      colFeatures: "Features",
      colSpots: "Surf Spots",
      colExternal: "External",
      viewAll: "View All 10",
      rights: "2026 SURFIT.IA",
      privacy: "Privacy",
      terms: "Terms",
    },
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
    aiCoach: {
      label: "FUNCIÓN ESTRELLA",
      heading: "Entrenador de Surf IA",
      subheading: "Análisis Biomecánico",
      description: "Sube tu foto de surf y recibe retroalimentación instantánea de IA sobre postura, trabajo de rail y dirección de mirada. Impulsado por visión artificial entrenada con surfistas profesionales.",
      comingSoon: "Próximamente — la función de subida requiere cuenta en la app",
    },
    features: {
      label: "EXPLORAR",
      heading: "Funciones y Herramientas",
      mediaGallery: "Galería de Medios",
      tabs: { images: "Imágenes de Surf", videos: "Vídeos" },
      imageDesc: "Explora fotografías de surf seleccionadas de los mejores spots del mundo.",
      videoDesc: "Mira los mejores highlights de surf y análisis de trucos.",
      galleryAvailable: "Galería disponible en la app",
      videosAvailable: "Vídeos disponibles en la app",
      surfShop: {
        title: "Tienda de Surf",
        description: "Descubre las 10 mejores tiendas de surf online. Mejores precios, tablas premium y trajes en Europa y el mundo.",
      },
      shopSoon: "Lista de tiendas próximamente",
      googleTravel: {
        title: "Google Travel Surf",
        description: "Explora los mejores viajes de surf y precios a destinos de ensueño en todo el mundo vía Google Travel.",
        cta: "RESERVAR VIAJE",
      },
      worldSpots: {
        title: "Galería de Spots del Mundo",
        description: "Explora fotos panorámicas y los mejores lugares donde ocurre el surf a nivel global.",
        cta: "VER SPOTS",
      },
    },
    adventure: {
      label: "MEJORES VIAJES Y VÍDEOS",
      heading: "Aventura y Consejos",
      watchTrips: "Ver Mejores Viajes",
      youtubeCurated: "Lista Curada de YouTube",
    },
    spots: {
      label: "SELECCIONADOS POR EXPERTOS EN OLAS",
      heading: "Top 10 Spots de Surf del Mundo",
      subtitle: "El ranking definitivo de las mejores olas del mundo.",
    },
    footer: {
      tagline: "Entrenamiento de surf con IA y guía de olas",
      colFeatures: "Funciones",
      colSpots: "Spots de Surf",
      colExternal: "Externo",
      viewAll: "Ver los 10",
      rights: "2026 SURFIT.IA",
      privacy: "Privacidad",
      terms: "Términos",
    },
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

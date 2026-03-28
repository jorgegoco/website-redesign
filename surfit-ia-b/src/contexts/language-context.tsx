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
      eyebrow: "AI-POWERED SURF COACHING",
      subheading: "Master the science of surfing with artificial intelligence. AI surf posture analysis & correction.",
      cta: "Explore Top 10 Spots",
    },
    toggle: "ES",
    aiCoach: {
      label: "Core Feature",
      heading: "AI Surf Coach",
      description: "Upload a photo of your surf session. Our AI analyzes your stance, rail work, and gaze — delivering instant biomechanical feedback to improve your technique.",
      comingSoon: "Coming soon — upload feature requires app account",
    },
    features: {
      label: "Surf Tools",
      heading: "YOUR SURF TOOLKIT",
      mediaGallery: "Media Gallery",
      tabs: { images: "Surf Images", videos: "Videos" },
      imageDesc: "Browse surf images and watch curated video highlights from the best sessions worldwide.",
      videoDesc: "Watch curated surf highlights and session videos.",
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
        cta: "Book Trip",
      },
      worldSpots: {
        title: "World Spot Gallery",
        description: "Explore panoramic photos and the best locations where surfing happens globally.",
        cta: "View Spots",
      },
    },
    adventure: {
      label: "Best Trips & Videos",
      heading: "Adventure & Advice",
      videosSoon: "Full video library available in the app",
    },
    spots: {
      label: "Curated Data",
      heading: "Top 10 World Surf Spots",
      subtitle: "Ranked by elite wave hunters. Real conditions, real data.",
    },
    footer: {
      tagline: "AI-powered surf coaching and wave intelligence.",
      colProduct: "Product",
      colExplore: "Explore",
      colLegal: "Legal",
      rights: "All rights reserved",
    },
  },
  es: {
    nav: {
      aiCoach: "Entrenador IA",
      features: "Funciones",
      spots: "Spots",
      adventures: "Aventuras",
    },
    hero: {
      eyebrow: "ENTRENAMIENTO DE SURF CON IA",
      subheading: "Domina la ciencia del surf con inteligencia artificial. Análisis y corrección de postura con IA.",
      cta: "Explorar Top 10 Spots",
    },
    toggle: "EN",
    aiCoach: {
      label: "Función Principal",
      heading: "Entrenador de Surf IA",
      description: "Sube una foto de tu sesión de surf. Nuestra IA analiza tu postura, trabajo de rail y mirada — entregando retroalimentación biomecánica instantánea para mejorar tu técnica.",
      comingSoon: "Próximamente — la función de subida requiere cuenta en la app",
    },
    features: {
      label: "Herramientas de Surf",
      heading: "TU KIT DE SURF",
      mediaGallery: "Galería de Medios",
      tabs: { images: "Imágenes de Surf", videos: "Vídeos" },
      imageDesc: "Explora imágenes de surf y vídeos destacados de las mejores sesiones del mundo.",
      videoDesc: "Mira highlights de surf y vídeos de sesiones seleccionados.",
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
        cta: "Reservar Viaje",
      },
      worldSpots: {
        title: "Galería de Spots del Mundo",
        description: "Explora fotos panorámicas y los mejores lugares donde ocurre el surf a nivel global.",
        cta: "Ver Spots",
      },
    },
    adventure: {
      label: "Mejores Viajes y Vídeos",
      heading: "Aventura y Consejos",
      videosSoon: "Biblioteca de vídeos completa disponible en la app",
    },
    spots: {
      label: "Datos Curados",
      heading: "Top 10 Spots de Surf del Mundo",
      subtitle: "Clasificados por expertos en olas. Condiciones reales, datos reales.",
    },
    footer: {
      tagline: "Entrenamiento de surf con IA e inteligencia de olas.",
      colProduct: "Producto",
      colExplore: "Explorar",
      colLegal: "Legal",
      rights: "Todos los derechos reservados",
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

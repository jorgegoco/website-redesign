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
      subheading: "Master the science of surfing with artificial intelligence. AI surf posture analysis & correction.",
      cta: "Explore Features",
    },
    toggle: "ES",
    aiCoach: {
      label: "AI Coach",
      heading: "BIOMECHANICAL ANALYSIS",
      description: "Upload a photo to receive instant AI feedback on your stance, rail work, and gaze. AI Surf posture check & correction powered by computer vision.",
      comingSoon: "Coming soon — upload feature requires app account",
    },
    features: {
      label: "Everything You Need",
      heading: "YOUR SURF TOOLKIT",
      tabs: { images: "Surf Images", videos: "Videos" },
      imageDesc: "Browse stunning surf photography from around the world.",
      videoDesc: "Watch curated surf highlights and session videos.",
      galleryAvailable: "Gallery available in the app",
      videosAvailable: "Videos available in the app",
      surfShop: {
        title: "SURF SHOP",
        description: "Discover the 10 best surf shops online. Best prices, premium boards, and wetsuits in Europe & World.",
      },
      shopSoon: "Shop list coming soon",
      googleTravel: {
        title: "GOOGLE TRAVEL SURF",
        description: "Explore the best surf trips and prices to blue destinations worldwide via Google Travel.",
        cta: "Book Trip",
      },
      worldSpots: {
        title: "WORLD SPOT GALLERY",
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
      label: "Curated by Elite Wave Hunters",
      heading: "TOP 10 WORLD SURF SPOTS",
    },
    footer: {
      tagline: "AI-powered surf coaching. Analyze your technique, explore the world's best waves, and plan your next adventure.",
      colFeatures: "Features",
      colExplore: "Explore",
      colExternal: "External",
      rights: "All rights reserved",
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
      subheading: "Domina la ciencia del surf con inteligencia artificial. Análisis y corrección de postura con IA.",
      cta: "Explorar Funciones",
    },
    toggle: "EN",
    aiCoach: {
      label: "Entrenador IA",
      heading: "ANÁLISIS BIOMECÁNICO",
      description: "Sube una foto para recibir retroalimentación instantánea de IA sobre tu postura, trabajo de rail y mirada. Verificación y corrección de postura de surf con visión artificial.",
      comingSoon: "Próximamente — la función de subida requiere cuenta en la app",
    },
    features: {
      label: "Todo lo que Necesitas",
      heading: "TU KIT DE SURF",
      tabs: { images: "Imágenes de Surf", videos: "Vídeos" },
      imageDesc: "Explora impresionantes fotografías de surf de todo el mundo.",
      videoDesc: "Mira highlights de surf y vídeos de sesiones seleccionados.",
      galleryAvailable: "Galería disponible en la app",
      videosAvailable: "Vídeos disponibles en la app",
      surfShop: {
        title: "TIENDA DE SURF",
        description: "Descubre las 10 mejores tiendas de surf online. Mejores precios, tablas premium y trajes en Europa y el mundo.",
      },
      shopSoon: "Lista de tiendas próximamente",
      googleTravel: {
        title: "GOOGLE TRAVEL SURF",
        description: "Explora los mejores viajes de surf y precios a destinos de ensueño en todo el mundo vía Google Travel.",
        cta: "Reservar Viaje",
      },
      worldSpots: {
        title: "GALERÍA DE SPOTS DEL MUNDO",
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
      label: "Seleccionados por Expertos en Olas",
      heading: "TOP 10 SPOTS DE SURF DEL MUNDO",
    },
    footer: {
      tagline: "Entrenamiento de surf con IA. Analiza tu técnica, explora las mejores olas del mundo y planifica tu próxima aventura.",
      colFeatures: "Funciones",
      colExplore: "Explorar",
      colExternal: "Externo",
      rights: "Todos los derechos reservados",
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

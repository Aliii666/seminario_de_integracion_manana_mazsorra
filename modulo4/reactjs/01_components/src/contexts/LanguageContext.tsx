// src/contexts/LanguageContext.tsx
import { createContext, useContext, useState } from 'react'

export type Language = 'es' | 'en' | 'fr'

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  es: {
    welcome: 'Bienvenido',
    goodbye: 'Adiós',
    settings: 'Configuración',
    cart: 'Carrito',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    theme: 'Tema',
  },
  en: {
    welcome: 'Welcome',
    goodbye: 'Goodbye',
    settings: 'Settings',
    cart: 'Cart',
    login: 'Log In',
    logout: 'Log Out',
    theme: 'Theme',
  },
  fr: {
    welcome: 'Bienvenue',
    goodbye: 'Au revoir',
    settings: 'Paramètres',
    cart: 'Panier',
    login: 'Connexion',
    logout: 'Déconnexion',
    theme: 'Thème',
  },
}

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  function t(key: string): string {
    return TRANSLATIONS[language][key] ?? key
  }

  return (
    <LanguageContext value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext>
  )
}

export function useTranslation(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useTranslation debe usarse dentro de <LanguageProvider>')
  return context
}

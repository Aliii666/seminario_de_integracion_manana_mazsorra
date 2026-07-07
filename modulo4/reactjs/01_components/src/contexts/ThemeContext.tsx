// src/contexts/ThemeContext.tsx
import { createContext, useContext, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type FontSize = 'sm' | 'md' | 'lg'

interface ThemeContextValue {
  theme:       Theme
  fontSize:    FontSize
  toggleTheme: () => void
  setFontSize: (size: FontSize) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [fontSize, setFontSizeState] = useState<FontSize>('md')

  function toggleTheme() {
    setTheme((prev) => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'system'
      return 'light'
    })
  }

  function setFontSize(size: FontSize) {
    setFontSizeState(size)
  }

  return (
    <ThemeContext value={{ theme, fontSize, toggleTheme, setFontSize }}>
      {children}
    </ThemeContext>
  )
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return context
}

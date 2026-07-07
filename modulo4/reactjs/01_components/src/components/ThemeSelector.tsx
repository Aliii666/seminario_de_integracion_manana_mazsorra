// src/components/ThemeSelector.tsx
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function ThemeSelector() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('local-theme', 'light')

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 320,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Tema Local (useLocalStorage Hook)
      </h3>

      <div style={{ display: 'flex', gap: 8 }}>
        {(['light', 'dark'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            style={{
              flex: 1,
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              background: theme === t ? '#2563eb' : '#ffffff',
              color:      theme === t ? '#ffffff' : '#374151',
              borderColor: theme === t ? '#2563eb' : '#d1d5db',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 13,
              outline: 'none',
              transition: 'all 0.15s',
            }}
          >
            {t === 'light' ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        ))}
      </div>

      <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', fontStyle: 'italic', lineHeight: 1.3 }}>
        *Selecciona una opción y recarga la página (F5) para comprobar que la opción seleccionada persiste en tu navegador.
      </p>
    </div>
  )
}

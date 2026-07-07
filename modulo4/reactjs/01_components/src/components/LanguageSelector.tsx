// src/components/LanguageSelector.tsx
import React from 'react'
import { useTranslation, Language } from '../contexts/LanguageContext'

export default function LanguageSelector() {
  const { language, setLanguage, t } = useTranslation()

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
        Selector de Idioma (TranslationContext)
      </h3>

      <div style={{ display: 'flex', gap: 6 }}>
        {(['es', 'en', 'fr'] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            style={{
              flex: 1,
              padding: '6px 10px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              background: language === lang ? '#2563eb' : '#ffffff',
              color:      language === lang ? '#ffffff' : '#374151',
              borderColor: language === lang ? '#2563eb' : '#d1d5db',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
            }}
          >
            {lang === 'es' ? 'Español' : lang === 'en' ? 'English' : 'Français'}
          </button>
        ))}
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 12,
          background: '#f9fafb',
          borderRadius: 8,
          border: '1px solid #f3f4f6',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Traducciones Activas
        </span>
        <div style={{ fontSize: 14, color: '#374151' }}>
          <strong>welcome:</strong> {t('welcome')}
        </div>
        <div style={{ fontSize: 14, color: '#374151' }}>
          <strong>goodbye:</strong> {t('goodbye')}
        </div>
        <div style={{ fontSize: 14, color: '#374151' }}>
          <strong>settings:</strong> {t('settings')}
        </div>
        <div style={{ fontSize: 14, color: '#374151' }}>
          <strong>cart:</strong> {t('cart')}
        </div>
      </div>
    </div>
  )
}

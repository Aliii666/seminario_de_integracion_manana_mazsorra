// src/components/CurrentDateDisplay.tsx
import React from 'react'

interface CurrentDateDisplayProps {
  showTime?: boolean
  locale?: string
}

export default function CurrentDateDisplay({
  showTime = true,
  locale = 'es-ES',
}: CurrentDateDisplayProps) {
  const now = new Date()

  const fecha = now.toLocaleDateString(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Mexico_City',
  })

  const hora = now.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Mexico_City',
  })

  return (
    <div
      style={{
        fontSize: 14,
        color: '#4b5563',
        background: '#f3f4f6',
        padding: '12px 16px',
        borderRadius: 8,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'monospace',
        border: '1px solid #e5e7eb',
      }}
    >
      <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>📅 {fecha}</span>
      {showTime && (
        <>
          <span style={{ color: '#d1d5db' }}>|</span>
          <span style={{ color: '#059669', fontWeight: 600 }}>⏰ {hora}</span>
        </>
      )}
    </div>
  )
}

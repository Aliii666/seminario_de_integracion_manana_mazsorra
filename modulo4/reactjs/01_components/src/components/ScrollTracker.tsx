// src/components/ScrollTracker.tsx
import React, { useState, useEffect, useRef } from 'react'

export default function ScrollTracker() {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    function handleScroll() {
      if (element) {
        setScrollTop(element.scrollTop)
      }
    }

    element.addEventListener('scroll', handleScroll)

    // Cleanup: remove the event listener from the referenced element
    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
        Rastreador de Scroll (Element Ref)
      </h3>

      <div style={{ fontSize: 14, color: '#4b5563' }}>
        Posición de Scroll Vertical: <strong style={{ color: '#2563eb' }}>{scrollTop} px</strong>
      </div>

      <div
        ref={containerRef}
        style={{
          height: 180,
          overflowY: 'auto',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          padding: '12px 16px',
          background: '#f9fafb',
        }}
      >
        <p style={{ margin: '0 0 16px 0', fontSize: 13, color: '#6b7280' }}>
          <strong>Inicio del Contenido</strong>
        </p>
        {Array.from({ length: 15 }).map((_, i) => (
          <p key={i} style={{ fontSize: 13, color: '#374151', margin: '0 0 12px 0' }}>
            Línea de contenido de ejemplo número {i + 1}. Haz scroll para ver la posición.
          </p>
        ))}
        <p style={{ margin: 0, fontSize: 13, color: '#10b981', fontWeight: 600 }}>
          <strong>Fin del Contenido</strong>
        </p>
      </div>
    </div>
  )
}

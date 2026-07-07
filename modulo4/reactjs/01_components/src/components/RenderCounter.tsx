// src/components/RenderCounter.tsx
import React, { useState, useRef } from 'react'

export default function RenderCounter() {
  const [dummyState, setDummyState] = useState(0)
  const renderCountRef = useRef(0)

  // Increment render counter on every render cycle
  // This does not trigger an additional render loop because it doesn't call a state setter
  renderCountRef.current += 1

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
        Contador de Renders (Silent Ref)
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
        <p style={{ margin: 0, color: '#4b5563' }}>
          Estado actual: <strong style={{ color: '#2563eb' }}>{dummyState}</strong>
        </p>
        <p style={{ margin: 0, color: '#111827', fontWeight: 600 }}>
          Renders del componente: <span style={{ color: '#ef4444', fontFamily: 'monospace', fontSize: 16 }}>{renderCountRef.current}</span>
        </p>
      </div>

      <button
        onClick={() => setDummyState((prev) => prev + 1)}
        style={{
          padding: '10px',
          background: '#111827',
          color: '#ffffff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: 13,
          outline: 'none',
        }}
      >
        Disparar Re-render (useState)
      </button>

      <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', fontStyle: 'italic', lineHeight: 1.3 }}>
        *Mutar un ref.current no desencadena renders. Observa que el contador de renders solo se actualiza en pantalla cuando fuerzas el render del componente mediante el botón de estado.
      </p>
    </div>
  )
}

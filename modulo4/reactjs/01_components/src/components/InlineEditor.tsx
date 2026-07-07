// src/components/InlineEditor.tsx
import React, { useRef, useState } from 'react'

export default function InlineEditor() {
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const [saved, setSaved] = useState('Escribe algo y guarda')

  function handleSave() {
    // Reads values directly from DOM ref targets
    const firstName = firstNameRef.current?.value.trim() ?? ''
    const lastName = lastNameRef.current?.value.trim() ?? ''
    
    if (!firstName && !lastName) {
      setSaved('(vacío)')
    } else {
      setSaved(`${firstName} ${lastName}`.trim())
    }
  }

  function handleClear() {
    if (firstNameRef.current) firstNameRef.current.value = ''
    if (lastNameRef.current) lastNameRef.current.value = ''
    firstNameRef.current?.focus()
  }

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 340,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Editor Simple (Componente No Controlado)
      </h3>

      <p style={{ margin: 0, color: '#6b7280', fontSize: 13 }}>
        Guardado: <strong style={{ color: '#111827' }}>{saved}</strong>
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          ref={firstNameRef}
          defaultValue=""
          placeholder="Nombre..."
          style={inputStyle}
        />
        <input
          ref={lastNameRef}
          defaultValue=""
          placeholder="Apellido..."
          style={inputStyle}
        />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleSave} style={primaryBtnStyle}>
          Guardar
        </button>
        <button onClick={handleClear} style={secondaryBtnStyle}>
          Limpiar
        </button>
      </div>
      
      <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', fontStyle: 'italic', lineHeight: 1.3 }}>
        *Observa en React DevTools que escribir aquí no desencadena re-renderizaciones hasta que pulses "Guardar".
      </p>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  fontSize: 14,
  boxSizing: 'border-box' as const,
  outline: 'none',
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 600,
  transition: 'all 0.15s',
}

const primaryBtnStyle = {
  ...btnStyle,
  background: '#2563eb',
  color: '#fff',
  flex: 1,
}

const secondaryBtnStyle = {
  ...btnStyle,
  background: '#f3f4f6',
  color: '#4b5563',
  border: '1px solid #e5e7eb',
}

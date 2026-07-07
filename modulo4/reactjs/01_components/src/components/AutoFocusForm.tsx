// src/components/AutoFocusForm.tsx
import React, { useRef, useEffect } from 'react'

export default function AutoFocusForm() {
  const nameRef  = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  // Auto focus first input on mount
  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  function handleNameKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      // Focus and select text in the email field
      emailRef.current?.focus()
      emailRef.current?.select()
    }
  }

  function handleEmailKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      phoneRef.current?.focus()
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Formulario enviado con éxito!')
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        maxWidth: 320,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        fontFamily: 'sans-serif',
      }}
    >
      <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Formulario Foco Automático
      </h3>
      <p style={{ margin: '0 0 10px 0', fontSize: 12, color: '#6b7280' }}>
        Presiona Enter para saltar secuencialmente: Nombre → Email → Teléfono.
      </p>

      <div>
        <label style={labelStyle}>Nombre</label>
        <input
          ref={nameRef}
          placeholder="Escribe tu nombre..."
          onKeyDown={handleNameKeyDown}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Email</label>
        <input
          ref={emailRef}
          type="email"
          defaultValue="ejemplo@correo.com" // defaultValue to test .select() on Enter focus
          placeholder="correo@ejemplo.com"
          onKeyDown={handleEmailKeyDown}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Teléfono</label>
        <input
          ref={phoneRef}
          type="tel"
          placeholder="+34 600 000 000"
          style={inputStyle}
        />
      </div>

      <button type="submit" style={btnStyle}>
        Enviar
      </button>
    </form>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: '#4b5563',
  marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
}

const btnStyle: React.CSSProperties = {
  padding: '10px',
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 13,
  marginTop: 6,
}

// src/components/AutoFocusInput.tsx
import React, { useEffect, useRef } from 'react'

export default function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 360,
        fontFamily: 'sans-serif',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Auto Focus Input
      </h3>
      <input
        ref={inputRef}
        placeholder="Este input recibe foco automáticamente al montar..."
        style={{
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          width: '100%',
          fontSize: 14,
          boxSizing: 'border-box',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
      />
    </div>
  )
}

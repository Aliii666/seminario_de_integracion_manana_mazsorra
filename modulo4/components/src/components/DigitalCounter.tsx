// src/components/DigitalCounter.tsx
import React, { useState } from 'react'

interface DigitalCounterProps {
  initialValue?: number
  step?: number
  label?: string
  min?: number
  max?: number
}

export default function DigitalCounter({
  initialValue = 0,
  step = 1,
  label = 'Contador',
  min = -Infinity,
  max = Infinity,
}: DigitalCounterProps) {
  const [count, setCount] = useState(initialValue)

  function increment() {
    setCount((prev) => {
      const next = prev + step
      return next <= max ? next : prev
    })
  }

  function decrement() {
    setCount((prev) => {
      const next = prev - step
      return next >= min ? next : prev
    })
  }

  function reset() {
    setCount(initialValue)
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px 20px',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        fontFamily: 'sans-serif',
      }}
    >
      <span style={{ fontSize: 14, color: '#4b5563', fontWeight: 600 }}>{label}</span>
      <button
        onClick={decrement}
        disabled={count <= min}
        style={{
          ...btnStyle,
          opacity: count <= min ? 0.4 : 1,
          cursor: count <= min ? 'not-allowed' : 'pointer',
        }}
      >
        −
      </button>
      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          minWidth: 60,
          textAlign: 'center',
          color: '#111827',
          fontFamily: 'monospace',
        }}
      >
        {count}
      </span>
      <button
        onClick={increment}
        disabled={count >= max}
        style={{
          ...btnStyle,
          opacity: count >= max ? 0.4 : 1,
          cursor: count >= max ? 'not-allowed' : 'pointer',
        }}
      >
        +
      </button>
      <button
        onClick={reset}
        style={{
          ...btnStyle,
          width: 'auto',
          padding: '0 12px',
          fontSize: 12,
          color: '#ef4444',
          borderColor: '#fee2e2',
          background: '#fef2f2',
          fontWeight: 600,
        }}
      >
        Reset
      </button>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 8,
  border: '1px solid #d1d5db',
  background: '#f9fafb',
  cursor: 'pointer',
  fontSize: 18,
  fontWeight: 600,
  color: '#374151',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.15s ease',
  outline: 'none',
}

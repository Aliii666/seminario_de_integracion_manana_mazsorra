// src/components/LiveClock.tsx
import React, { useState, useEffect } from 'react'

export default function LiveClock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => new Date(prev.getTime() + 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        borderRadius: 12,
        border: '1px solid #334155',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        maxWidth: 320,
        fontFamily: 'sans-serif',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 600, letterSpacing: '0.05em' }}>
        RELOJ EN TIEMPO REAL
      </span>
      <p
        style={{
          fontFamily: 'monospace',
          fontSize: 32,
          margin: '8px 0 0 0',
          letterSpacing: 2,
          color: '#ffffff',
          fontWeight: 700,
        }}
      >
        {time.toLocaleTimeString('en-US', { hour12: true })}
      </p>
    </div>
  )
}

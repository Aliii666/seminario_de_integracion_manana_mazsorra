// src/components/WindowSize.tsx
import React, { useState, useEffect, useRef } from 'react'

interface WindowDimensions {
  width: number
  height: number
  devicePixelRatio: number
}

export default function WindowSize() {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
  })

  const throttleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function handleResize() {
      console.log('resize detectado')

      if (throttleTimer.current) {
        clearTimeout(throttleTimer.current)
      }

      throttleTimer.current = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
          devicePixelRatio: window.devicePixelRatio,
        })
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (throttleTimer.current) {
        clearTimeout(throttleTimer.current)
      }
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
        maxWidth: 360,
        fontFamily: 'sans-serif',
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Dimensiones de Ventana
      </h3>
      <p style={{ margin: '0 0 8px 0', fontSize: 14, color: '#374151', fontFamily: 'monospace' }}>
        <strong>Ventana:</strong> {dimensions.width} × {dimensions.height} px
      </p>
      <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
        <strong>Relación de Píxeles (DPR):</strong> {dimensions.devicePixelRatio.toFixed(2)}
      </p>
      <p style={{ margin: '12px 0 0 0', fontSize: 11, color: '#9ca3af', fontStyle: 'italic' }}>
        *Throttled a 100ms para optimizar el rendimiento de renderizado.
      </p>
    </div>
  )
}

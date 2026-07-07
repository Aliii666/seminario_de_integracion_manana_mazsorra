// src/components/TemperatureDisplay.tsx
import React from 'react'

interface TemperatureDisplayProps {
  celsius: number
}

export default function TemperatureDisplay({ celsius }: TemperatureDisplayProps) {
  const fahrenheit = (celsius * 9) / 5 + 32
  const kelvin = celsius + 273.15

  const getTempColor = (c: number) => {
    if (c >= 28) return { bg: '#fff5f5', border: '#feb2b2', text: '#c53030', label: 'Caliente' }
    if (c >= 18) return { bg: '#f0fff4', border: '#9ae6b4', text: '#22543d', label: 'Templado' }
    return { bg: '#ebf8ff', border: '#90cdf4', text: '#2b6cb0', label: 'Frío' }
  }

  const { bg, border, text, label } = getTempColor(celsius)

  return (
    <div
      style={{
        border: `1px solid ${border}`,
        backgroundColor: bg,
        borderRadius: 12,
        padding: 20,
        maxWidth: 320,
        fontFamily: 'sans-serif',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#4b5563', textTransform: 'uppercase' }}>
          Termómetro
        </span>
        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, backgroundColor: '#fff', border: `1px solid ${border}`, color: text, fontWeight: 600 }}>
          {label}
        </span>
      </div>

      <div style={{ fontSize: 36, fontWeight: 800, color: text, margin: '8px 0' }}>
        {celsius.toFixed(1)}°C
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 12, borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: '#718096', fontWeight: 600 }}>FAHRENHEIT</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#2d3748', marginTop: 2 }}>
            {fahrenheit.toFixed(1)}°F
          </div>
        </div>
        <div style={{ flex: 1, borderLeft: '1px solid rgba(0,0,0,0.05)', paddingLeft: 12 }}>
          <div style={{ fontSize: 11, color: '#718096', fontWeight: 600 }}>KELVIN</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#2d3748', marginTop: 2 }}>
            {kelvin.toFixed(2)} K
          </div>
        </div>
      </div>
    </div>
  )
}

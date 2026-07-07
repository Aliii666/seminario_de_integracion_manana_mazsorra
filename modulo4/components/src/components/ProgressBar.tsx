// src/components/ProgressBar.tsx
import React from 'react'

interface ProgressBarProps {
  percent: number
  color?: string
}

export default function ProgressBar({ percent, color = '#3b82f6' }: ProgressBarProps) {
  const clampedPercent = Math.min(100, Math.max(0, percent))

  return (
    <div style={{ width: '100%', maxWidth: 400, fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#4b5563' }}>Progreso</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
          {clampedPercent.toFixed(0)}%
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: 10,
          backgroundColor: '#e5e7eb',
          borderRadius: 9999,
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        <div
          style={{
            width: `${clampedPercent}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 9999,
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  )
}

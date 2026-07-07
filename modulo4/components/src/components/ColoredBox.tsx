// src/components/ColoredBox.tsx
import React from 'react'

interface ColoredBoxProps {
  color: string
  width?: number
  height?: number
  label?: string
  borderRadius?: number
  onClick?: () => void
}

export default function ColoredBox({
  color,
  width = 80,
  height = 80,
  label,
  borderRadius = 8,
  onClick,
}: ColoredBoxProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.1s ease',
      }}
    >
      <div
        style={{
          width,
          height,
          backgroundColor: color,
          borderRadius,
          border: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      />
      {label && (
        <span style={{ fontSize: 12, color: '#4b5563', fontWeight: 500 }}>
          {label}
        </span>
      )}
    </div>
  )
}

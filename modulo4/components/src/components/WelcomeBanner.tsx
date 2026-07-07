// src/components/WelcomeBanner.tsx
import React from 'react'

interface WelcomeBannerProps {
  subtitle?: string
}

export default function WelcomeBanner({ subtitle }: WelcomeBannerProps) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
        color: '#fff',
        padding: '24px 32px',
        borderRadius: 16,
        boxShadow: '0 10px 15px -3px rgba(22, 163, 74, 0.2), 0 4px 6px -4px rgba(22, 163, 74, 0.2)',
        transition: 'transform 0.2s ease',
      }}
    >
      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em' }}>
        Bienvenido al curso de React
      </h1>
      <p style={{ margin: '8px 0 0', opacity: 0.9, fontSize: 16, lineHeight: 1.5 }}>
        {subtitle ?? 'Aprende React 19 con TypeScript'}
      </p>
    </div>
  )
}

// src/components/BusinessCard.tsx
import React from 'react'

interface BusinessCardProps {
  name: string
  email: string
  phone?: string
  website?: string
}

export default function BusinessCard({ name, email, phone, website }: BusinessCardProps) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#f8fafc',
        borderRadius: 16,
        padding: '24px',
        maxWidth: 380,
        fontFamily: 'sans-serif',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
        border: '1px solid #334155',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.03)',
        }}
      />

      <h3 style={{ margin: '0 0 4px 0', fontSize: 20, fontWeight: 700, color: '#ffffff' }}>
        {name}
      </h3>
      <span style={{ fontSize: 12, color: '#38bdf8', fontWeight: 600, letterSpacing: '0.05em' }}>
        TARJETA DE PRESENTACIÓN
      </span>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
          <span style={{ color: '#94a3b8' }}>✉️</span>
          <a href={`mailto:${email}`} style={{ color: '#e2e8f0', textDecoration: 'none' }}>
            {email}
          </a>
        </div>

        {phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
            <span style={{ color: '#94a3b8' }}>📞</span>
            <a href={`tel:${phone}`} style={{ color: '#e2e8f0', textDecoration: 'none' }}>
              {phone}
            </a>
          </div>
        )}

        {website && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
            <span style={{ color: '#94a3b8' }}>🌐</span>
            <a
              href={website.startsWith('http') ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 500 }}
            >
              {website}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

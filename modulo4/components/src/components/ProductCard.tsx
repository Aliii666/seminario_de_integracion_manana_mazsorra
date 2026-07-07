// src/components/ProductCard.tsx
import React from 'react'

interface ProductCardProps {
  title: string
  description?: string
  highlighted?: boolean
  price?: number
  onClick?: () => void
}

export default function ProductCard({
  title,
  description = '',
  highlighted = false,
  price,
  onClick,
}: ProductCardProps) {
  const cardStyle: React.CSSProperties = {
    border: highlighted ? '2px solid gold' : '1px solid #e5e7eb',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    backgroundColor: highlighted ? '#fffbea' : '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
  }

  return (
    <div style={cardStyle} onClick={onClick}>
      <h3 style={{ margin: '0 0 8px', fontSize: 18, color: '#111827' }}>{title}</h3>
      <p style={{ margin: 0, color: '#4b5563', fontSize: 14 }}>
        {description || 'Sin descripción'}
      </p>
      {price !== undefined && (
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Precio</span>
          <strong style={{ fontSize: 16, color: '#059669' }}>
            ${price.toFixed(2)}
          </strong>
        </div>
      )}
    </div>
  )
}

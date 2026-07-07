// src/components/CatalogProductItem.tsx
import React from 'react'

interface CatalogProductItemProps {
  id: number
  name: string
  price: number
  onAddToCart: (id: number, name: string, price: number) => void
}

export default function CatalogProductItem({
  id,
  name,
  price,
  onAddToCart,
}: CatalogProductItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #f3f4f6',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 8,
        transition: 'all 0.15s ease',
        fontFamily: 'sans-serif',
      }}
    >
      <div>
        <p style={{ margin: 0, fontWeight: 600, color: '#1f2937', fontSize: 14 }}>{name}</p>
        <p style={{ margin: '2px 0 0 0', fontSize: 13, color: '#059669', fontWeight: 600 }}>
          ${price.toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => onAddToCart(id, name, price)}
        style={{
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 14px',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
          transition: 'background-color 0.2s',
          outline: 'none',
        }}
      >
        + Agregar
      </button>
    </div>
  )
}

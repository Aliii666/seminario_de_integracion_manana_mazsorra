// src/components/ShoppingCartSummary.tsx
import React from 'react'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface ShoppingCartSummaryProps {
  items: CartItem[]
  onClearCart: () => void
}

export default function ShoppingCartSummary({
  items,
  onClearCart,
}: ShoppingCartSummaryProps) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 20,
        marginTop: 24,
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        fontFamily: 'sans-serif',
        maxWidth: 400,
      }}
    >
      <h3 style={{ marginTop: 0, color: '#111827', fontSize: 16, fontWeight: 600 }}>
        Carrito ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
      </h3>

      {items.length === 0 ? (
        <p style={{ color: '#9ca3af', fontStyle: 'italic', fontSize: 14, margin: '12px 0' }}>
          El carrito está vacío.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0 0' }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #f3f4f6',
                fontSize: 14,
                color: '#374151',
              }}
            >
              <span>
                <strong style={{ color: '#2563eb', fontWeight: 600 }}>{item.quantity}x</strong> {item.name}
              </span>
              <span style={{ fontWeight: 500 }}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 700,
              fontSize: 16,
              color: '#111827',
              paddingTop: 12,
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <span>Total</span>
            <span style={{ color: '#059669' }}>${total.toFixed(2)}</span>
          </div>
          
          <button
            onClick={onClearCart}
            style={{
              marginTop: 14,
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 16px',
              cursor: 'pointer',
              width: '100%',
              fontSize: 13,
              fontWeight: 600,
              transition: 'background-color 0.2s',
              outline: 'none',
            }}
          >
            Vaciar carrito
          </button>
        </div>
      )}
    </div>
  )
}

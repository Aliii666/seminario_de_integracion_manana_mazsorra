// src/components/ShoppingCartContextDemo.tsx
import React from 'react'
import { useCart } from '../contexts/CartContext'

const PRODUCTS = [
  { id: 1, name: 'Teclado mecánico',  price: 89  },
  { id: 2, name: 'Monitor 27"',       price: 349 },
  { id: 3, name: 'Mouse inalámbrico', price: 29  },
]

export default function ShoppingCartContextDemo() {
  const { state, total, itemCount, addItem, removeItem, increment, decrement, clear, toggleCart } = useCart()

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 400,
        fontFamily: 'sans-serif',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Tienda Global (CartContext)
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        {PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 10px',
              borderBottom: '1px solid #f3f4f6',
            }}
          >
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{prod.name}</span>
              <span style={{ marginLeft: 8, fontSize: 12, color: '#059669', fontWeight: 600 }}>${prod.price}</span>
            </div>
            <button
              onClick={() => addItem(prod)}
              style={{
                padding: '4px 10px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              + Añadir
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={toggleCart}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: itemCount > 0 ? '#2563eb' : '#f3f4f6',
          color: itemCount > 0 ? '#ffffff' : '#4b5563',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: 13,
          marginBottom: 12,
        }}
      >
        {state.isOpen ? 'Ocultar Carrito' : `Ver Carrito (${itemCount} items)`}
      </button>

      {state.isOpen && (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, background: '#f9fafb' }}>
          {state.items.length === 0 ? (
            <p style={{ color: '#9ca3af', margin: 0, fontSize: 13, fontStyle: 'italic', textAlign: 'center' }}>
              El carrito está vacío
            </p>
          ) : (
            <>
              {state.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 0',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{item.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button onClick={() => decrement(item.id)} style={qtyBtnStyle}>-</button>
                    <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                    <button onClick={() => increment(item.id)} style={qtyBtnStyle}>+</button>
                    <span style={{ minWidth: 50, textAlign: 'right', fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>✕</button>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 14, marginTop: 10, paddingTop: 6 }}>
                <span>Total</span>
                <span style={{ color: '#059669' }}>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={clear}
                style={{
                  marginTop: 10,
                  width: '100%',
                  padding: '6px',
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                Vaciar Carrito
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

const qtyBtnStyle = {
  width: 20,
  height: 20,
  border: '1px solid #d1d5db',
  borderRadius: 4,
  background: '#ffffff',
  cursor: 'pointer',
  fontSize: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

// src/components/SafeCounter.tsx
import React, { useState } from 'react'

export default function SafeCounter() {
  const [count, setCount] = useState(0)

  console.log('render', count)

  function increment() {
    setCount((prev) => prev + 1)
  }

  function decrement() {
    setCount((prev) => prev - 1)
  }

  function incrementThreeSafe() {
    setCount((prev) => prev + 1)
    setCount((prev) => prev + 1)
    setCount((prev) => prev + 1)
  }

  function incrementThreeUnsafe() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  function incrementTenLoop() {
    for (let i = 0; i < 10; i++) {
      setCount((prev) => prev + 1)
    }
  }

  function multiplyByEightSafe() {
    setCount((prev) => prev * 2)
    setCount((prev) => prev * 2)
    setCount((prev) => prev * 2)
  }

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 420,
        fontFamily: 'sans-serif',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Contador Seguro (Safe vs Unsafe State)
      </h3>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: '#4f46e5', fontFamily: 'monospace' }}>
          {count}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <button onClick={decrement} style={btnStyle}>−1</button>
        <button onClick={increment} style={btnStyle}>+1</button>
        <button onClick={incrementThreeSafe} style={safeBtnStyle}>+3 (Seguro)</button>
        <button onClick={incrementThreeUnsafe} style={dangerBtnStyle}>+3 (Inseguro: count+1)</button>
        <button onClick={incrementTenLoop} style={safeBtnStyle}>+10 (Bucle de 10)</button>
        <button onClick={multiplyByEightSafe} style={safeBtnStyle}>×2 ×2 ×2 (x8)</button>
      </div>

      <p style={{ margin: '14px 0 0 0', fontSize: 12, color: '#6b7280', fontStyle: 'italic', textAlign: 'center' }}>
        *Abre la consola de desarrollo (F12) para ver las llamadas a render.
      </p>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid #d1d5db',
  background: '#f9fafb',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
  color: '#374151',
  transition: 'all 0.15s ease',
  outline: 'none',
}

const safeBtnStyle: React.CSSProperties = {
  ...btnStyle,
  background: '#ecfdf5',
  borderColor: '#a7f3d0',
  color: '#065f46',
}

const dangerBtnStyle: React.CSSProperties = {
  ...btnStyle,
  background: '#fef2f2',
  borderColor: '#fca5a5',
  color: '#991b1b',
}

// src/components/QuantitySelector.tsx
import { useCounter } from '../hooks/useCounter'

export default function QuantitySelector() {
  const { count, increment, decrement, reset } = useCounter({
    initialValue: 1,
    min: 1,
    max: 99,
  })

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 320,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Selector de Cantidad (useCounter Hook)
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={decrement}
          disabled={count === 1}
          style={qBtnStyle}
        >
          −
        </button>
        <span style={{ minWidth: 40, textAlign: 'center', fontWeight: 700, fontSize: 16, color: '#111827', fontFamily: 'monospace' }}>
          {count}
        </span>
        <button
          onClick={increment}
          disabled={count === 99}
          style={qBtnStyle}
        >
          +
        </button>
        <button
          onClick={reset}
          style={{
            ...qBtnStyle,
            width: 'auto',
            padding: '0 12px',
            fontSize: 11,
            color: '#6b7280',
            borderColor: '#e5e7eb',
            background: '#f9fafb',
            fontWeight: 600,
          }}
        >
          Reset
        </button>
      </div>
      
      <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', fontStyle: 'italic' }}>
        *Parámetros del hook: valor inicial 1, rango límites [1, 99].
      </p>
    </div>
  )
}

const qBtnStyle = {
  width: 32,
  height: 32,
  border: '1px solid #d1d5db',
  borderRadius: 8,
  background: '#ffffff',
  color: '#374151',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
}

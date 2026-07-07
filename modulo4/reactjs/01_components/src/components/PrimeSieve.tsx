// src/components/PrimeSieve.tsx
import { useState, useMemo } from 'react'

// Sieve of Eratosthenes — complexity O(n log log n)
function sieve(n: number): number[] {
  if (n < 2) return []
  const isPrime = new Array(n + 1).fill(true)
  isPrime[0] = isPrime[1] = false
  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) isPrime[j] = false
    }
  }
  return isPrime.reduce<number[]>((acc, ok, i) => (ok ? [...acc, i] : acc), [])
}

export default function PrimeSieve() {
  const [limit,   setLimit]   = useState(10_000)
  const [counter, setCounter] = useState(0)

  // useMemo: the sieve calculation only executes when `limit` changes
  const primes = useMemo(() => sieve(limit), [limit])

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: 520,
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Criba de Primos (useMemo)
      </h3>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
        El contador provoca re-renderizaciones de la vista, pero la criba de primos solo se vuelve a calcular cuando cambia el límite.
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600, color: '#4b5563' }}>
          Límite (N): {limit.toLocaleString()}
          <input
            type="range"
            min={1000}
            max={100_000}
            step={1000}
            value={limit}
            onChange={e => setLimit(Number(e.target.value))}
            style={{ width: 200, cursor: 'pointer' }}
          />
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600, color: '#4b5563' }}>
          Forzar Re-render (Counter)
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              onClick={() => setCounter(c => c - 1)}
              style={btnStyle}
            >−</button>
            <span style={{ minWidth: 32, textAlign: 'center', fontFamily: 'monospace', fontSize: 15 }}>{counter}</span>
            <button
              onClick={() => setCounter(c => c + 1)}
              style={btnStyle}
            >+</button>
          </div>
        </div>
      </div>

      <div style={{
        display:      'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap:          12,
        marginBottom: 20,
      }}>
        {[
          { label: 'Primos encontrados', value: primes.length.toLocaleString() },
          { label: 'Límite actual',      value: limit.toLocaleString() },
          { label: 'Mayor primo',        value: (primes.at(-1) ?? 0).toLocaleString() },
        ].map(({ label, value }) => (
          <div key={label} style={{
            padding:    12,
            background: '#f9fafb',
            borderRadius: 8,
            border: '1px solid #f3f4f6',
            fontSize:   12,
          }}>
            <div style={{ color: '#9ca3af', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>{value}</div>
          </div>
        ))}
      </div>

      <details style={{ fontSize: 13 }}>
        <summary style={{ cursor: 'pointer', color: '#2563eb', fontWeight: 600 }}>
          Ver primeros 20 primos
        </summary>
        <div style={{ marginTop: 8, color: '#374151', lineHeight: 1.6, padding: '8px 12px', background: '#f9fafb', borderRadius: 6, border: '1px solid #f3f4f6', fontFamily: 'monospace' }}>
          {primes.slice(0, 20).join(', ')}
        </div>
      </details>
    </div>
  )
}

const btnStyle = {
  padding: '4px 12px',
  borderRadius: 6,
  border: '1px solid #d1d5db',
  background: '#ffffff',
  color: '#374151',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 13,
  outline: 'none',
}

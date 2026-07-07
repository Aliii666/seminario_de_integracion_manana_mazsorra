// src/components/UserGreeting.tsx
import React from 'react'

interface UserGreetingProps {
  name: string
  occupation?: string
  online?: boolean
}

export default function UserGreeting({ name, occupation, online = false }: UserGreetingProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 3)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#e11d48',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 16,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          {initials}
        </div>
        {online && (
          <span
            style={{
              position: 'absolute',
              bottom: 2,
              right: 2,
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              border: '2px solid #fff',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
            }}
          />
        )}
      </div>
      <div>
        <p style={{ margin: 0, fontWeight: 600, color: '#1f2937', fontSize: 16 }}>Hola, {name}</p>
        {occupation && (
          <p style={{ margin: 0, fontSize: 13, color: '#6b7280', marginTop: 2 }}>{occupation}</p>
        )}
      </div>
    </div>
  )
}

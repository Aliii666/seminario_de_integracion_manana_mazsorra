// src/components/FruitList.tsx
import React from 'react'

interface Fruit {
  name: string
  emoji: string
  calories: number
  inSeason?: boolean
}

interface FruitListProps {
  fruits: Fruit[]
  title?: string
}

export default function FruitList({ fruits, title = 'Frutas' }: FruitListProps) {
  if (fruits.length === 0) {
    return (
      <div style={{ padding: 16, background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb', maxWidth: 320 }}>
        <p style={{ color: '#9ca3af', margin: 0 }}>No hay frutas en la lista.</p>
      </div>
    )
  }

  const sortedFruits = [...fruits].sort((a, b) => a.calories - b.calories)

  return (
    <div style={{ maxWidth: 320, background: '#ffffff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 16 }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>{title}</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {sortedFruits.map((fruit, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              borderBottom: 'none',
              borderRadius: 6,
              backgroundColor: i % 2 === 0 ? '#f9fafb' : '#ffffff',
            }}
          >
            <span style={{ fontSize: 14, color: '#374151', display: 'flex', alignItems: 'center', gap: 6 }}>
              {fruit.inSeason && <span style={{ color: '#eab308' }}>🌟</span>}
              <span style={{ fontSize: 18 }}>{fruit.emoji}</span>
              {fruit.name}
            </span>
            <span style={{ color: '#6b7280', fontSize: 13, fontWeight: 500 }}>
              {fruit.calories} kcal
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

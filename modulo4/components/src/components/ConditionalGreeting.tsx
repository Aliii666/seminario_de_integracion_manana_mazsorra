// src/components/ConditionalGreeting.tsx
import React from 'react'

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

interface ConditionalGreetingProps {
  isLoggedIn: boolean
  userName?: string
  timeOfDay?: TimeOfDay
  greeting?: string
}

export default function ConditionalGreeting({
  isLoggedIn,
  userName = 'visitante',
  timeOfDay = 'morning',
  greeting,
}: ConditionalGreetingProps) {
  const greetings: Record<TimeOfDay, string> = {
    morning:   'Buenos días',
    afternoon: 'Buenas tardes',
    evening:   'Buenas noches',
    night:     'Feliz noche',
  }

  const selectedGreeting = greeting ?? greetings[timeOfDay]

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        backgroundColor: isLoggedIn ? '#f0fdf4' : '#fef2f2',
        maxWidth: 360,
      }}
    >
      {!isLoggedIn ? (
        <p style={{ color: '#dc2626', margin: 0, fontWeight: 500 }}>
          ⚠️ Por favor inicia sesión para continuar.
        </p>
      ) : (
        <p style={{ color: '#15803d', margin: 0, fontWeight: 500 }}>
          {selectedGreeting}, <strong style={{ color: '#166534' }}>{userName}</strong>. Bienvenido de vuelta.
        </p>
      )}
    </div>
  )
}

// src/components/RatingStars.tsx
import React from 'react'

interface RatingStarsProps {
  rating: number
  maxStars?: number
}

export default function RatingStars({ rating, maxStars = 5 }: RatingStarsProps) {
  const clampedMax = Math.max(1, maxStars)
  const clampedRating = Math.min(clampedMax, Math.max(0, rating))

  const stars = []
  for (let i = 1; i <= clampedMax; i++) {
    const isFilled = i <= Math.round(clampedRating)
    stars.push(
      <span
        key={i}
        style={{
          color: isFilled ? '#eab308' : '#d1d5db',
          fontSize: 24,
          marginRight: 2,
          userSelect: 'none',
        }}
      >
        {isFilled ? '★' : '☆'}
      </span>
    )
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex' }}>{stars}</div>
      <span style={{ fontSize: 13, color: '#4b5563', fontWeight: 600, marginLeft: 4 }}>
        ({rating.toFixed(1)} / {clampedMax})
      </span>
    </div>
  )
}

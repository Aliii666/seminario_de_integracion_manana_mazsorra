// src/components/TagList.tsx
import React from 'react'

interface TagListProps {
  tags: string[]
  color?: string
}

export default function TagList({ tags, color = '#3b82f6' }: TagListProps) {
  if (tags.length === 0) {
    return null
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontFamily: 'sans-serif' }}>
      {tags.map((tag, idx) => (
        <span
          key={idx}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 12,
            fontWeight: 600,
            backgroundColor: `${color}15`,
            color: color,
            border: `1px solid ${color}30`,
            padding: '4px 10px',
            borderRadius: 6,
            transition: 'all 0.2s ease',
          }}
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}

// src/components/MiniProfileCard.tsx
import React from 'react'
import StatusBadge, { BadgeStatus } from './StatusBadge'

interface MiniProfileCardProps {
  fullName: string
  role: string
  department?: string
  status: BadgeStatus
  joinedYear: number
  avatarColor?: string
}

export default function MiniProfileCard({
  fullName,
  role,
  department,
  status,
  joinedYear,
  avatarColor = '#6366f1',
}: MiniProfileCardProps) {
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const yearsInCompany = new Date().getFullYear() - joinedYear

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 20,
        maxWidth: 300,
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: avatarColor,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 18,
            flexShrink: 0,
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {initials}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 16, color: '#111827' }}>{fullName}</p>
          <p style={{ margin: 0, fontSize: 13, color: '#6b7280', marginTop: 2 }}>{role}</p>
        </div>
      </div>

      {department && (
        <div
          style={{
            margin: 0,
            fontSize: 13,
            color: '#4b5563',
            backgroundColor: '#f3f4f6',
            padding: '6px 12px',
            borderRadius: 6,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>📂</span> {department}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <StatusBadge status={status} />
        <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>
          {yearsInCompany === 0
            ? 'Nuevo ingreso'
            : `${yearsInCompany} año${yearsInCompany > 1 ? 's' : ''} en la empresa`}
        </span>
      </div>
    </div>
  )
}

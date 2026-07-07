// src/components/UserProfileCard.tsx
import React from 'react'

interface UserProfileCardProps {
  fullName: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  isActive: boolean
  skills: string[]
  bio?: string
  avatar?: string
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function UserProfileCard({
  fullName,
  email,
  role,
  isActive,
  skills,
  bio,
  avatar,
}: UserProfileCardProps) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
        maxWidth: 400,
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {avatar ? (
            <img
              src={avatar}
              alt={fullName}
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            />
          ) : (
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 18,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {getInitials(fullName)}
            </div>
          )}
          <div>
            <h2 style={{ margin: 0, fontSize: 18, color: '#111827', fontWeight: 600 }}>{fullName}</h2>
            <p style={{ margin: '2px 0 0', color: '#6b7280', fontSize: 14 }}>{email}</p>
          </div>
        </div>

        <span
          style={{
            backgroundColor: isActive ? '#d4edda' : '#f8d7da',
            color: isActive ? '#155724' : '#721c24',
            padding: '4px 12px',
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {isActive ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      <div style={{ marginTop: 16 }}>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: '#4b5563' }}>
          Rol del sistema: <strong style={{ color: '#111827', textTransform: 'capitalize' }}>{role}</strong>
        </p>

        {bio && (
          <p style={{ fontStyle: 'italic', color: '#4b5563', fontSize: 13, background: '#f9fafb', padding: 10, borderRadius: 8, margin: '0 0 16px 0', borderLeft: '3px solid #d1d5db' }}>
            "{bio}"
          </p>
        )}

        <div style={{ marginTop: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Habilidades
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: 12,
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '3px 8px',
                  borderRadius: 6,
                  border: '1px solid #e5e7eb',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

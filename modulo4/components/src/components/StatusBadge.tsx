// src/components/StatusBadge.tsx
import React from 'react'

export type BadgeStatus = 'active' | 'inactive' | 'pending' | 'error' | 'warning'

interface StatusBadgeProps {
  status: BadgeStatus
  label?: string
  icon?: string
}

export default function StatusBadge({ status, label, icon }: StatusBadgeProps) {
  const config: Record<BadgeStatus, { bg: string; color: string; text: string }> = {
    active:   { bg: '#dcfce7', color: '#166534', text: 'Activo' },
    inactive: { bg: '#f3f4f6', color: '#374151', text: 'Inactivo' },
    pending:  { bg: '#fef9c3', color: '#854d0e', text: 'Pendiente' },
    error:    { bg: '#fee2e2', color: '#991b1b', text: 'Error' },
    warning:  { bg: '#ffedd5', color: '#c2410c', text: 'Advertencia' },
  }

  const { bg, color, text } = config[status]

  return (
    <span
      style={{
        backgroundColor: bg,
        color,
        padding: '6px 16px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      {icon && <span style={{ fontSize: 13 }}>{icon}</span>}
      {label ?? text}
    </span>
  )
}

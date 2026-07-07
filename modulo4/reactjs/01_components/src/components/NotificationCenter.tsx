// src/components/NotificationCenter.tsx
import React, { useState } from 'react'
import { useNotifications, Notification } from '../contexts/NotificationContext'

export default function NotificationCenter() {
  const { notifications, addNotification, removeNotification, clearAll } = useNotifications()
  const [inputMessage, setInputMessage] = useState('')
  const [notiType, setNotiType] = useState<Notification['type']>('info')

  function handleAdd() {
    const msg = inputMessage.trim() || 'Notificación por defecto'
    addNotification(msg, notiType)
    setInputMessage('')
  }

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 360,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Centro de Notificaciones Globales
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Mensaje de notificación..."
          style={inputStyle}
        />
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#4b5563' }}>Tipo:</label>
          <select
            value={notiType}
            onChange={(e) => setNotiType(e.target.value as Notification['type'])}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
              fontSize: 12,
              backgroundColor: '#fff',
              outline: 'none',
            }}
          >
            <option value="info">Info (Información)</option>
            <option value="success">Success (Éxito)</option>
            <option value="error">Error (Peligro)</option>
          </select>
          <button onClick={handleAdd} style={primaryBtnStyle}>
            Agregar
          </button>
        </div>
      </div>

      {notifications.length > 0 && (
        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 12, marginTop: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Bandeja de Entrada ({notifications.length})
            </span>
            <button
              onClick={clearAll}
              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 11, fontWeight: 600, padding: 0 }}
            >
              Borrar todas
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {notifications.map((item) => {
              const bg = item.type === 'success' ? '#ecfdf5' : item.type === 'error' ? '#fef2f2' : '#eff6ff'
              const color = item.type === 'success' ? '#065f46' : item.type === 'error' ? '#991b1b' : '#1e40af'
              const border = item.type === 'success' ? '#a7f3d0' : item.type === 'error' ? '#fca5a5' : '#bfdbfe'
              
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: bg,
                    color: color,
                    border: `1px solid ${border}`,
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                >
                  <span>{item.message}</span>
                  <button
                    onClick={() => removeNotification(item.id)}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}
                  >
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  fontSize: 14,
  boxSizing: 'border-box' as const,
  outline: 'none',
}

const primaryBtnStyle = {
  marginLeft: 'auto',
  padding: '6px 14px',
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontSize: 12,
  fontWeight: 600,
}

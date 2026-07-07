// src/components/OnlineStatus.tsx
import React, { useState, useEffect } from 'react'

export default function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    function handleOnline()  { setIsOnline(true)  }
    function handleOffline() { setIsOnline(false) }
    
    function handleVisibilityChange() {
      console.log('Visibilidad del documento cambiada:', document.hidden ? 'oculto' : 'visible')
    }

    window.addEventListener('online',  handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('online',  handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

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
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Estado de Conexión
      </h3>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          borderRadius: 8,
          backgroundColor: isOnline ? '#ecfdf5' : '#fef2f2',
          border: `1px solid ${isOnline ? '#a7f3d0' : '#fca5a5'}`,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: isOnline ? '#10b981' : '#ef4444',
          }}
        />
        <span style={{ fontSize: 14, color: isOnline ? '#065f46' : '#991b1b', fontWeight: 600 }}>
          {isOnline ? 'Conectado a Internet' : 'Sin conexión'}
        </span>
      </div>
      <p style={{ margin: '12px 0 0 0', fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>
        *Cambia a offline en DevTools (Network tab) o cambia de pestaña para ver los logs de visibilidad.
      </p>
    </div>
  )
}

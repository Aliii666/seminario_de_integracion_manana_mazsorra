// src/components/ResponsiveLayout.tsx
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useWindowSize } from '../hooks/useWindowSize'
import { useOnlineStatus } from '../hooks/useOnlineStatus'

export default function ResponsiveLayout() {
  const isMobile  = useMediaQuery('(max-width: 768px)')
  const isTablet  = useMediaQuery('(max-width: 1024px)')
  const { width, height } = useWindowSize()
  const isOnline = useOnlineStatus()

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 520,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Layout Responsivo (useWindowSize & useMediaQuery)
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
          gap: 10,
        }}
      >
        <div style={cardStyle}>
          <p style={cardLabel}>Resolución Activa</p>
          <p style={cardValue}>{width} × {height} px</p>
        </div>
        <div style={cardStyle}>
          <p style={cardLabel}>Dispositivo Detectado</p>
          <p style={cardValue}>{isMobile ? 'Móvil' : isTablet ? 'Tablet' : 'Escritorio'}</p>
        </div>
        <div style={{ ...cardStyle, background: isOnline ? '#ecfdf5' : '#fef2f2', borderColor: isOnline ? '#a7f3d0' : '#fca5a5' }}>
          <p style={{ ...cardLabel, color: isOnline ? '#065f46' : '#991b1b' }}>Red / Conexión</p>
          <p style={{ ...cardValue, color: isOnline ? '#166534' : '#721c24' }}>{isOnline ? 'Online' : 'Offline'}</p>
        </div>
      </div>
      
      <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', fontStyle: 'italic', lineHeight: 1.3 }}>
        *Abre DevTools (F12) y redimensiona la pantalla para ver el grid reaccionar. Desactiva internet en la pestaña Network para ver el estado Online cambiar.
      </p>
    </div>
  )
}

const cardStyle = {
  padding: 14,
  background: '#f9fafb',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
}

const cardLabel = {
  margin: 0,
  fontSize: 11,
  fontWeight: 600,
  color: '#9ca3af',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
}

const cardValue = {
  margin: '4px 0 0',
  fontSize: 14,
  fontWeight: 700,
  color: '#111827',
}

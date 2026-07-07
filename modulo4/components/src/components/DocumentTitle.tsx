// src/components/DocumentTitle.tsx
import React, { useEffect } from 'react'

export default function DocumentTitle() {
  useEffect(() => {
    console.log('efecto ejecutado')
    const originalTitle = document.title
    document.title = 'Efectos con React 19'

    return () => {
      console.log('limpieza ejecutada')
      document.title = originalTitle || 'React App'
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
      <h3 style={{ margin: '0 0 10px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Título del Documento
      </h3>
      <p style={{ margin: 0, fontSize: 14, color: '#6b7280', lineHeight: 1.5 }}>
        El título de la pestaña del navegador cambió al montar este componente. Al cambiar de paso, la función de limpieza restaurará el título original.
      </p>
    </div>
  )
}

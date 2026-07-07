// src/components/ClickOutside.tsx
import React, { useState, useEffect, useRef } from 'react'

export default function ClickOutside() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleGlobalClick(e: MouseEvent) {
      // Close dropdown if the clicked element is outside the menu container
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleGlobalClick)
    }

    // Cleanup: remove global mousedown listener
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick)
    }
  }, [isOpen])

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 320,
        fontFamily: 'sans-serif',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Detector de Click Exterior (ClickOutside)
      </h3>

      <div ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
            outline: 'none',
          }}
        >
          {isOpen ? 'Cerrar Menú ▲' : 'Abrir Menú ▼'}
        </button>

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: 8,
              width: 200,
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '10px 12px',
                fontSize: 13,
                color: '#374151',
                borderBottom: '1px solid #f3f4f6',
                cursor: 'pointer',
              }}
              onClick={() => alert('Opción 1 seleccionada')}
            >
              Configuración de Perfil
            </div>
            <div
              style={{
                padding: '10px 12px',
                fontSize: 13,
                color: '#374151',
                borderBottom: '1px solid #f3f4f6',
                cursor: 'pointer',
              }}
              onClick={() => alert('Opción 2 seleccionada')}
            >
              Centro de Ayuda
            </div>
            <div
              style={{
                padding: '10px 12px',
                fontSize: 13,
                color: '#ef4444',
                cursor: 'pointer',
                fontWeight: 600,
              }}
              onClick={() => {
                setIsOpen(false)
                alert('Sesión cerrada')
              }}
            >
              Cerrar Sesión
            </div>
          </div>
        )}
      </div>

      <p style={{ margin: '14px 0 0 0', fontSize: 11, color: '#9ca3af', fontStyle: 'italic', lineHeight: 1.3 }}>
        *Abre el menú y haz click en cualquier parte fuera de él; se cerrará automáticamente.
      </p>
    </div>
  )
}

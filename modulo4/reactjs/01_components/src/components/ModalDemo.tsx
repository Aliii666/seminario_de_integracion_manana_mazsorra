// src/components/ModalDemo.tsx
import { useToggle } from '../hooks/useToggle'

export default function ModalDemo() {
  const { value: isOpen, toggle, setFalse } = useToggle()

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Demo de Modal (useToggle Hook)
      </h3>

      <button
        onClick={toggle}
        style={{
          padding: '10px 16px',
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
        Abrir Modal
      </button>

      {isOpen && (
        <div
          onClick={setFalse} // Click backdrop to close
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking panel
            style={{
              background: '#ffffff',
              borderRadius: 12,
              padding: 24,
              minWidth: 320,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <h4 style={{ margin: 0, fontSize: 18, color: '#111827', fontWeight: 700 }}>
              Panel del Modal
            </h4>
            <p style={{ margin: 0, fontSize: 14, color: '#4b5563', lineHeight: 1.5 }}>
              Este modal es controlado por un hook personalizado <code>useToggle</code>. Puedes cerrarlo haciendo click en el botón de abajo o en el fondo oscuro exterior.
            </p>
            <button
              onClick={setFalse}
              style={{
                marginTop: 8,
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                outline: 'none',
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

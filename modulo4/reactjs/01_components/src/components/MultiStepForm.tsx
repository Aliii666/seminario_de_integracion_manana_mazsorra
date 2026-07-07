// src/components/MultiStepForm.tsx
import React, { useReducer } from 'react'

interface FormData {
  name:     string
  email:    string
  address:  string
  comments: string
}

interface FormState {
  step: 1 | 2 | 3
  data: FormData
  submitted: boolean
}

type FormAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_FIELD'; field: keyof FormData; value: string }
  | { type: 'SUBMIT' }
  | { type: 'RESET' }

const INITIAL_STATE: FormState = {
  step: 1,
  data: {
    name: '',
    email: '',
    address: '',
    comments: '',
  },
  submitted: false,
}

function multiStepReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        step: Math.min(3, state.step + 1) as 1 | 2 | 3,
      }
    case 'PREV_STEP':
      return {
        ...state,
        step: Math.max(1, state.step - 1) as 1 | 2 | 3,
      }
    case 'SET_FIELD':
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
      }
    case 'SUBMIT':
      return {
        ...state,
        submitted: true,
      }
    case 'RESET':
      return INITIAL_STATE
    default:
      return state
  }
}

export default function MultiStepForm() {
  const [state, dispatch] = useReducer(multiStepReducer, INITIAL_STATE)

  function handleFieldChange(field: keyof FormData, value: string) {
    dispatch({ type: 'SET_FIELD', field, value })
  }

  const isNextDisabled = () => {
    if (state.step === 1) return !state.data.name.trim()
    if (state.step === 2) return !state.data.email.trim() || !state.data.address.trim()
    return false
  }

  if (state.submitted) {
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
        <div style={{ textAlign: 'center', color: '#166534', background: '#dcfce7', padding: 16, borderRadius: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 24 }}>🎉</span>
          <h4 style={{ margin: '8px 0 0', fontWeight: 700 }}>¡Formulario Enviado!</h4>
        </div>
        <div style={{ fontSize: 13, color: '#4b5563', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ margin: 0 }}><strong>Nombre:</strong> {state.data.name}</p>
          <p style={{ margin: 0 }}><strong>Email:</strong> {state.data.email}</p>
          <p style={{ margin: 0 }}><strong>Dirección:</strong> {state.data.address}</p>
          {state.data.comments && <p style={{ margin: 0 }}><strong>Comentarios:</strong> {state.data.comments}</p>}
        </div>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          style={{
            marginTop: 16,
            width: '100%',
            padding: '8px',
            backgroundColor: '#111827',
            color: '#ffffff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Iniciar Nuevo Registro
        </button>
      </div>
    )
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
        gap: 14,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Registro en Pasos (Paso {state.step} de 3)
      </h3>

      {/* Progress Bar */}
      <div style={{ display: 'flex', gap: 4, height: 6, backgroundColor: '#f3f4f6', borderRadius: 999 }}>
        <div style={{ flex: 1, backgroundColor: state.step >= 1 ? '#2563eb' : '#e5e7eb', borderRadius: 999 }} />
        <div style={{ flex: 1, backgroundColor: state.step >= 2 ? '#2563eb' : '#e5e7eb', borderRadius: 999 }} />
        <div style={{ flex: 1, backgroundColor: state.step >= 3 ? '#2563eb' : '#e5e7eb', borderRadius: 999 }} />
      </div>

      {state.step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>INFORMACIÓN PERSONAL</span>
          <div>
            <label style={labelStyle}>Nombre Completo *</label>
            <input
              value={state.data.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="Escribe tu nombre..."
              style={inputStyle}
            />
          </div>
        </div>
      )}

      {state.step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>DATOS DE CONTACTO</span>
          <div>
            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              value={state.data.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="correo@ejemplo.com"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Dirección *</label>
            <input
              value={state.data.address}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              placeholder="Calle, Ciudad, Código Postal..."
              style={inputStyle}
            />
          </div>
        </div>
      )}

      {state.step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>CONFIRMACIÓN Y DETALLES</span>
          <div style={{ background: '#f9fafb', padding: 12, borderRadius: 8, fontSize: 13, border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div><strong>Nombre:</strong> {state.data.name}</div>
            <div><strong>Email:</strong> {state.data.email}</div>
            <div><strong>Dirección:</strong> {state.data.address}</div>
          </div>
          <div>
            <label style={labelStyle}>Comentarios Adicionales (Opcional)</label>
            <textarea
              value={state.data.comments}
              onChange={(e) => handleFieldChange('comments', e.target.value)}
              placeholder="Algún comentario adicional..."
              rows={3}
              style={{ ...inputStyle, resize: 'none' }}
            />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {state.step > 1 && (
          <button
            onClick={() => dispatch({ type: 'PREV_STEP' })}
            style={secondaryBtnStyle}
          >
            Atrás
          </button>
        )}

        {state.step < 3 ? (
          <button
            onClick={() => dispatch({ type: 'NEXT_STEP' })}
            disabled={isNextDisabled()}
            style={{
              ...primaryBtnStyle,
              backgroundColor: isNextDisabled() ? '#93c5fd' : '#2563eb',
              cursor: isNextDisabled() ? 'not-allowed' : 'pointer',
            }}
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: 'SUBMIT' })}
            style={{ ...primaryBtnStyle, backgroundColor: '#059669' }}
          >
            Enviar Registro
          </button>
        )}
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: '#4b5563',
  marginBottom: 4,
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

const btnStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 13,
  transition: 'all 0.15s',
  outline: 'none',
}

const primaryBtnStyle = {
  ...btnStyle,
  color: '#ffffff',
  flex: 1,
}

const secondaryBtnStyle = {
  ...btnStyle,
  background: '#f3f4f6',
  color: '#4b5563',
  border: '1px solid #e5e7eb',
}

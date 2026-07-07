// src/components/RegistrationForm.tsx
import React, { useReducer } from 'react'

interface FormState {
  name:     string
  email:    string
  password: string
  errors:   Partial<Record<'name' | 'email' | 'password', string>>
  status:   'idle' | 'submitting' | 'success' | 'error'
  errorMessage?: string
}

type FormAction =
  | { type: 'SET_FIELD'; field: keyof Pick<FormState, 'name' | 'email' | 'password'>; value: string }
  | { type: 'SET_ERRORS'; errors: FormState['errors'] }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; message: string }
  | { type: 'RESET' }

const INITIAL_STATE: FormState = {
  name:     '',
  email:    '',
  password: '',
  errors:   {},
  status:   'idle',
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: undefined },
      }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors }
    case 'SUBMIT_START':
      return { ...state, status: 'submitting', errorMessage: undefined }
    case 'SUBMIT_SUCCESS':
      return { ...INITIAL_STATE, status: 'success' }
    case 'SUBMIT_ERROR':
      return { ...state, status: 'error', errorMessage: action.message }
    case 'RESET':
      return INITIAL_STATE
    default:
      return state
  }
}

export default function RegistrationForm() {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE)

  function validate(): boolean {
    const errors: FormState['errors'] = {}
    
    // Strict email check regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!state.name.trim()) {
      errors.name = 'El nombre es requerido'
    }
    if (!emailRegex.test(state.email)) {
      errors.email = 'Introduce un email válido (ej: usuario@correo.com)'
    }
    if (state.password.length < 6) {
      errors.password = 'La contraseña debe tener mínimo 6 caracteres'
    }

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors })
      return false
    }
    return true
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return

    dispatch({ type: 'SUBMIT_START' })
    
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1200))

    if (state.email.toLowerCase().endsWith('@fail.com')) {
      dispatch({ type: 'SUBMIT_ERROR', message: 'Error del servidor: email registrado en la lista negra.' })
    } else {
      dispatch({ type: 'SUBMIT_SUCCESS' })
    }
  }

  const isSubmitting = state.status === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        maxWidth: 340,
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        fontFamily: 'sans-serif',
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Registro de Usuario (Formulario Reducer)
      </h3>

      {state.status === 'success' && (
        <div style={{ padding: 12, background: '#dcfce7', borderRadius: 8, color: '#166534', fontSize: 13, fontWeight: 500 }}>
          ✅ Registro exitoso
        </div>
      )}

      {state.status === 'error' && state.errorMessage && (
        <div style={{ padding: 12, background: '#fef2f2', borderRadius: 8, color: '#991b1b', fontSize: 13, fontWeight: 500 }}>
          ⚠️ {state.errorMessage}
        </div>
      )}

      <div>
        <label style={labelStyle}>Nombre completo</label>
        <input
          value={state.name}
          onChange={(e) =>
            dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })
          }
          placeholder="Tu nombre..."
          disabled={isSubmitting}
          style={inputStyle(!!state.errors.name)}
        />
        {state.errors.name && (
          <p style={errorStyle}>{state.errors.name}</p>
        )}
      </div>

      <div>
        <label style={labelStyle}>Correo electrónico</label>
        <input
          type="email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })
          }
          placeholder="usuario@correo.com"
          disabled={isSubmitting}
          style={inputStyle(!!state.errors.email)}
        />
        {state.errors.email && (
          <p style={errorStyle}>{state.errors.email}</p>
        )}
        <span style={{ fontSize: 10, color: '#9ca3af', display: 'block', marginTop: 4 }}>
          *Usa un correo que termine en <code>@fail.com</code> para forzar un error.
        </span>
      </div>

      <div>
        <label style={labelStyle}>Contraseña</label>
        <input
          type="password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })
          }
          placeholder="Mínimo 6 caracteres"
          disabled={isSubmitting}
          style={inputStyle(!!state.errors.password)}
        />
        {state.errors.password && (
          <p style={errorStyle}>{state.errors.password}</p>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            flex: 1,
            padding: '10px',
            background: isSubmitting ? '#93c5fd' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: 13,
            outline: 'none',
          }}
        >
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'RESET' })}
          disabled={isSubmitting}
          style={{
            padding: '10px 16px',
            background: '#f3f4f6',
            color: '#4b5563',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
            outline: 'none',
          }}
        >
          Limpiar
        </button>
      </div>
    </form>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: '#4b5563',
  marginBottom: 4,
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${hasError ? '#ef4444' : '#d1d5db'}`,
    borderRadius: 8,
    fontSize: 14,
    boxSizing: 'border-box',
    outline: 'none',
  }
}

const errorStyle: React.CSSProperties = {
  margin: '4px 0 0',
  fontSize: 12,
  color: '#ef4444',
}

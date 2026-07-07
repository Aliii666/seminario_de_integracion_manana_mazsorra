// src/components/LoginForm.tsx
import { useState } from 'react'
import { useAuth }  from '../contexts/AuthContext'

export default function LoginForm() {
  const { state, login } = useAuth()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await login(email, password)
  }

  const isSubmitting = state.isLoading

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        maxWidth: 320,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        fontFamily: 'sans-serif',
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Iniciar Sesión (AuthContext)
      </h3>

      <div>
        <label style={labelStyle}>Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@correo.com"
          disabled={isSubmitting}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Tu contraseña..."
          disabled={isSubmitting}
          style={inputStyle}
          required
        />
      </div>

      {state.error && (
        <div style={{ padding: '8px 10px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6, color: '#b91c1c', fontSize: 12, fontWeight: 500 }}>
          ⚠️ {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !email.trim() || !password.trim()}
        style={{
          padding: '10px',
          background: isSubmitting ? '#93c5fd' : '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: 13,
          outline: 'none',
          marginTop: 4,
        }}
      >
        {isSubmitting ? 'Entrando...' : 'Iniciar Sesión'}
      </button>

      <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', lineHeight: 1.4 }}>
        *Usa <code>error@test.com</code> como email para simular credenciales incorrectas.
      </p>
    </form>
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

// src/components/UserProfileForm.tsx
import React, { useState } from 'react'

interface UserProfile {
  name: string
  email: string
  age: number
  bio: string
}

export default function UserProfileForm() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    age: 0,
    bio: '',
  })

  function handleChange(field: keyof UserProfile, value: string | number) {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleClear() {
    setProfile({
      name: '',
      email: '',
      age: 0,
      bio: '',
    })
  }

  function testDirectMutation() {
    profile.name = 'Ana (Mutado Directamente)'
    setProfile(profile)
    alert('Objeto mutado en memoria. Observa que la UI no se actualizó.')
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (profile.name.trim() && profile.email.trim() && profile.age > 0) {
      alert(`Guardado con éxito:\n\nNombre: ${profile.name}\nEmail: ${profile.email}\nEdad: ${profile.age}\nBio: ${profile.bio || 'Sin bio'}`)
    } else {
      alert('Error: Por favor completa todos los campos requeridos (Nombre, Email y Edad).')
    }
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
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Perfil de Usuario (Estado de Objeto)
      </h3>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={labelStyle}>Nombre *</label>
          <input
            placeholder="Nombre completo"
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Email *</label>
          <input
            placeholder="correo@ejemplo.com"
            type="email"
            value={profile.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Edad *</label>
          <input
            placeholder="Edad"
            type="number"
            value={profile.age || ''}
            onChange={(e) => handleChange('age', Number(e.target.value))}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Bio</label>
          <textarea
            placeholder="Cuéntanos un poco sobre ti..."
            value={profile.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          <button type="submit" style={primaryBtnStyle}>Guardar</button>
          <button type="button" onClick={handleClear} style={secondaryBtnStyle}>Limpiar</button>
          <button type="button" onClick={testDirectMutation} style={warnBtnStyle}>Mutar Directo (Falla)</button>
        </div>
      </form>

      <div style={{ marginTop: 20, padding: 14, background: '#f9fafb', borderRadius: 8, border: '1px solid #f3f4f6' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Vista Previa (Estado Actual)
        </span>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: '#374151', lineHeight: 1.5 }}>
          <strong>{profile.name || '—'}</strong> · {profile.email || '—'} · {profile.age || '—'} años
        </p>
        {profile.bio && (
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#6b7280', fontStyle: 'italic' }}>
            "{profile.bio}"
          </p>
        )}
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
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
  transition: 'border-color 0.2s',
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  border: '1px solid #d1d5db',
  background: '#ffffff',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 600,
  transition: 'all 0.15s ease',
  outline: 'none',
}

const primaryBtnStyle: React.CSSProperties = {
  ...btnStyle,
  background: '#2563eb',
  borderColor: '#2563eb',
  color: '#ffffff',
}

const secondaryBtnStyle: React.CSSProperties = {
  ...btnStyle,
  background: '#f3f4f6',
  borderColor: '#e5e7eb',
  color: '#374151',
}

const warnBtnStyle: React.CSSProperties = {
  ...btnStyle,
  background: '#fffbeb',
  borderColor: '#fde68a',
  color: '#b45309',
}

// src/components/TrafficLight.tsx
import React, { useReducer } from 'react'

type LightColor = 'red' | 'yellow' | 'green'

interface LightState {
  color: LightColor
}

type LightAction =
  | { type: 'NEXT' }
  | { type: 'RESET' }

const INITIAL_STATE: LightState = { color: 'red' }

function trafficReducer(state: LightState, action: LightAction): LightState {
  switch (action.type) {
    case 'NEXT': {
      const nextMap: Record<LightColor, LightColor> = {
        red: 'green',
        green: 'yellow',
        yellow: 'red',
      }
      return { color: nextMap[state.color] }
    }
    case 'RESET':
      return INITIAL_STATE
    default:
      return state
  }
}

export default function TrafficLight() {
  const [state, dispatch] = useReducer(trafficReducer, INITIAL_STATE)

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 240,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Semáforo (useReducer)
      </h3>

      {/* Visual Traffic Light */}
      <div
        style={{
          width: 70,
          backgroundColor: '#1f2937',
          borderRadius: 20,
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
        }}
      >
        <div style={lightStyle('#ef4444', state.color === 'red')} />
        <div style={lightStyle('#f59e0b', state.color === 'yellow')} />
        <div style={lightStyle('#10b981', state.color === 'green')} />
      </div>

      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        <button
          onClick={() => dispatch({ type: 'NEXT' })}
          style={{
            flex: 1,
            padding: '8px 12px',
            backgroundColor: '#111827',
            color: '#ffffff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Siguiente
        </button>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          style={{
            padding: '8px 12px',
            backgroundColor: '#f3f4f6',
            color: '#4b5563',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

function lightStyle(colorHex: string, isActive: boolean): React.CSSProperties {
  return {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: colorHex,
    opacity: isActive ? 1 : 0.15,
    boxShadow: isActive ? `0 0 15px ${colorHex}, inset 0 2px 4px rgba(255,255,255,0.2)` : 'none',
    transition: 'all 0.2s ease',
  }
}

// src/components/BasicCounter.tsx
import React, { useReducer } from 'react'

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'DOUBLE' }
  | { type: 'SET'; payload: number }

interface CounterState {
  count: number
}

const INITIAL_STATE: CounterState = { count: 10 }

function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case 'INCREMENT': 
      return { count: state.count + 1 }
    case 'DECREMENT': 
      // Bounded decrement: prevents counts below 0
      return { count: Math.max(0, state.count - 1) }
    case 'RESET':     
      // Returns back to initial state (10), not 0
      return INITIAL_STATE
    case 'DOUBLE':
      return { count: state.count * 2 }
    case 'SET':       
      return { count: action.payload }
    default:
      return state
  }
}

export default function BasicCounter() {
  const [state, dispatch] = useReducer(counterReducer, INITIAL_STATE)

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
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600, textAlign: 'center' }}>
        Contador con Reducer
      </h3>

      <p style={{ fontFamily: 'monospace', fontSize: 36, margin: '8px 0', textAlign: 'center', fontWeight: 700, color: '#2563eb' }}>
        {state.count}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          style={btnStyle}
        >
          −
        </button>
        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          style={btnStyle}
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: 'DOUBLE' })}
          style={actionBtnStyle}
        >
          Duplicar (×2)
        </button>
        <button
          onClick={() => dispatch({ type: 'SET', payload: 42 })}
          style={actionBtnStyle}
        >
          Poner en 42
        </button>
      </div>

      <button
        onClick={() => dispatch({ type: 'RESET' })}
        style={{
          ...btnStyle,
          background: '#f3f4f6',
          color: '#4b5563',
          border: '1px solid #e5e7eb',
          fontWeight: 600,
        }}
      >
        Restablecer (a 10)
      </button>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: 8,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 14,
  outline: 'none',
  transition: 'background-color 0.15s',
}

const actionBtnStyle = {
  ...btnStyle,
  background: '#f0fdf4',
  color: '#166534',
  border: '1px solid #bbf7d0',
  fontSize: 12,
}

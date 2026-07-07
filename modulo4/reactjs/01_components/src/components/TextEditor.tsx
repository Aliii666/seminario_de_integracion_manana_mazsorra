// src/components/TextEditor.tsx
import React, { useReducer } from 'react'

interface EditorState {
  text: string
  history: string[]
}

type EditorAction =
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'UNDO' }
  | { type: 'CLEAR' }

const INITIAL_STATE: EditorState = {
  text: '',
  history: [],
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_TEXT':
      return {
        text: action.payload,
        // Append current text to history so we can undo later
        history: [...state.history, state.text],
      }
    case 'UNDO': {
      if (state.history.length === 0) return state
      
      const newHistory = [...state.history]
      const previousText = newHistory.pop() ?? ''

      return {
        text: previousText,
        history: newHistory,
      }
    }
    case 'CLEAR':
      return {
        text: '',
        history: [...state.history, state.text],
      }
    default:
      return state
  }
}

export default function TextEditor() {
  const [state, dispatch] = useReducer(editorReducer, INITIAL_STATE)

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 400,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Editor de Texto con Historial (Deshacer)
      </h3>

      <textarea
        value={state.text}
        onChange={(e) => dispatch({ type: 'SET_TEXT', payload: e.target.value })}
        placeholder="Comienza a escribir aquí..."
        rows={6}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid #d1d5db',
          fontSize: 14,
          boxSizing: 'border-box',
          outline: 'none',
          resize: 'none',
        }}
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          onClick={() => dispatch({ type: 'UNDO' })}
          disabled={state.history.length === 0}
          style={{
            flex: 1,
            padding: '8px 12px',
            backgroundColor: state.history.length === 0 ? '#f3f4f6' : '#111827',
            color: state.history.length === 0 ? '#9ca3af' : '#ffffff',
            cursor: state.history.length === 0 ? 'not-allowed' : 'pointer',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            outline: 'none',
          }}
        >
          Deshacer (Undo) ({state.history.length})
        </button>

        <button
          onClick={() => dispatch({ type: 'CLEAR' })}
          style={{
            padding: '8px 16px',
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            border: 'none',
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

      <div style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.3 }}>
        *Cada cambio guarda el estado anterior en una pila de historial. Haz clic en "Deshacer" para retroceder paso a paso.
      </div>
    </div>
  )
}

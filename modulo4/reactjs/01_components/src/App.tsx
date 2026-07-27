// src/App.tsx

import AutoFocusForm from './03useRef/AutoFocusForm'
import Stopwatch     from './03useRef/Stopwatch'
import InlineEditor  from './03useRef/InlineEditor'
import PreviousValue from './03useRef/PreviousValue'

// ┌──────────────────────────────────────────────────────────────────────┐
// │  Cambia PASO y guarda (Ctrl+S) para navegar entre componentes.       │
// │  1  AutoFocusForm    — foco automático y salto de campo con Enter   │
// │  2  Stopwatch        — interval guardado en ref, sin re-renders     │
// │  3  InlineEditor     — leer un input sin useState (ref no controlado)│
// │  4  PreviousValue    — guardar el valor anterior de un input        │
// └──────────────────────────────────────────────────────────────────────┘
const PASO = 1

export default function App() {
  const content =
    PASO === 1 ? <AutoFocusForm /> :
    PASO === 2 ? <Stopwatch /> :
    PASO === 3 ? <InlineEditor /> :
    PASO === 4 ? <PreviousValue /> :
    <p style={{ color: '#e00' }}>Paso {PASO}: crea el componente primero</p>

  return (
    <main style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif', padding: '0 16px' }}>
      {content}
    </main>
  )
}
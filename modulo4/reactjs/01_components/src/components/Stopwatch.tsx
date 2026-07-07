// src/components/Stopwatch.tsx
import React, { useState, useRef } from 'react'

export default function Stopwatch() {
  const [time,    setTime]    = useState(0)
  const [running, setRunning] = useState(false)
  const [laps,    setLaps]    = useState<number[]>([])

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function handleStart() {
    if (running) return
    setRunning(true)
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
  }

  function handleStop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setRunning(false)
  }

  function handleReset() {
    handleStop()
    setTime(0)
    setLaps([])
  }

  function handleLap() {
    setLaps((prev) => [...prev, time])
  }

  function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0')
    const seconds = (totalSeconds % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Cronómetro (useRef Interval)
      </h3>

      <p style={{ fontFamily: 'monospace', fontSize: 38, margin: 0, letterSpacing: 4, color: '#1f2937', fontWeight: 700 }}>
        {formatTime(time)}
      </p>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={handleStart}
          disabled={running}
          style={btnStyle(running ? '#9ca3af' : '#22c55e')}
        >
          Iniciar
        </button>
        <button
          onClick={handleStop}
          disabled={!running}
          style={btnStyle(!running ? '#9ca3af' : '#f59e0b')}
        >
          Pausar
        </button>
        <button
          onClick={handleLap}
          disabled={!running}
          style={btnStyle(!running ? '#9ca3af' : '#3b82f6')}
        >
          Vuelta
        </button>
        <button
          onClick={handleReset}
          style={btnStyle('#6b7280')}
        >
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div style={{ width: '100%', borderTop: '1px solid #f3f4f6', paddingTop: 12, marginTop: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Vueltas registradas
          </span>
          <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0 0', maxHeight: 120, overflowY: 'auto' }}>
            {laps.map((lapTime, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '4px 8px',
                  backgroundColor: '#f9fafb',
                  borderRadius: 6,
                  marginBottom: 4,
                  fontSize: 13,
                  color: '#4b5563',
                  fontFamily: 'monospace',
                }}
              >
                <span>Vuelta {idx + 1}</span>
                <strong>{formatTime(lapTime)}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function btnStyle(bg: string) {
  return {
    padding: '8px 12px',
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 13,
    transition: 'all 0.15s',
  }
}

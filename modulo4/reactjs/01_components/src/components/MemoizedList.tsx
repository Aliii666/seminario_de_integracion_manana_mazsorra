// src/components/MemoizedList.tsx
import { useState, useCallback, memo } from 'react'

interface Task {
  id:        number
  text:      string
  completed: boolean
}

const INITIAL_TASKS: Task[] = [
  { id: 1, text: 'Diseñar la interfaz',    completed: false },
  { id: 2, text: 'Implementar los hooks',  completed: true  },
  { id: 3, text: 'Escribir los tests',     completed: false },
  { id: 4, text: 'Revisar accesibilidad',  completed: false },
  { id: 5, text: 'Deploy en producción',   completed: false },
]

// ─── Memoized Row ──────────────────────────────────────────────────────
let rowRenderCount = 0

const TaskRow = memo(function TaskRow({
  task,
  onToggle,
  onDelete,
}: {
  task:     Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}) {
  rowRenderCount++
  const count = rowRenderCount

  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      gap:            10,
      padding:        '10px 14px',
      background:     task.completed ? '#ecfdf5' : '#ffffff',
      borderRadius:   8,
      border:         '1px solid',
      borderColor:    task.completed ? '#a7f3d0' : '#e5e7eb',
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        style={{ cursor: 'pointer', width: 16, height: 16 }}
      />
      <span style={{
        flex:           1,
        fontSize:       14,
        textDecoration: task.completed ? 'line-through' : 'none',
        color:          task.completed ? '#6b7280' : '#111827',
        fontWeight: 500,
      }}>
        {task.text}
      </span>
      <span style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>render #{count}</span>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          padding:      '4px 10px',
          borderRadius: 6,
          border:       '1px solid #fca5a5',
          background:   '#fef2f2',
          color:        '#b91c1c',
          cursor:       'pointer',
          fontSize:     12,
          fontWeight: 600,
        }}
      >
        ✕
      </button>
    </div>
  )
})

// ─── Parent Component ───────────────────────────────────────────────────
export default function MemoizedList() {
  const [tasks,   setTasks]   = useState<Task[]>(INITIAL_TASKS)
  const [counter, setCounter] = useState(0)

  // useCallback: onToggle and onDelete have stable references.
  // TaskRow will not re-render when 'counter' changes.
  const handleToggle = useCallback((id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }, [])

  const handleDelete = useCallback((id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: 520,
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Lista de Tareas Memoizada (useCallback)
      </h3>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
        <code>React.memo</code> + <code>useCallback</code> — las filas no se vuelven a renderizar al presionar un contador externo.
      </p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
        <button
          onClick={() => setCounter(c => c + 1)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid #d1d5db',
            background: '#f9fafb',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
            outline: 'none',
          }}
        >
          Incrementar counter ({counter})
        </button>
        <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>
          ← no re-renderiza las filas
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tasks.map(task => (
          <TaskRow
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <p style={{ marginTop: 16, fontSize: 11, color: '#9ca3af', fontStyle: 'italic', textAlign: 'center' }}>
        Render total de filas: {rowRenderCount} (crece solo al hacer toggle o delete).
      </p>
    </div>
  )
}

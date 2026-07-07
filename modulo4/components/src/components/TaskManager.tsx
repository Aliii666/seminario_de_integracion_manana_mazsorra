// src/components/TaskManager.tsx
import React, { useState, useRef } from 'react'

interface Task {
  id: number
  text: string
  done: boolean
  priority: 'alta' | 'normal'
}

type TaskFilter = 'all' | 'done' | 'pending'

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState<'alta' | 'normal'>('normal')
  const [filter, setFilter] = useState<TaskFilter>('all')

  const nextId = useRef(1)

  function addTask() {
    if (!input.trim()) return
    setTasks((prev) => [
      ...prev,
      {
        id: nextId.current++,
        text: input.trim(),
        done: false,
        priority,
      },
    ])
    setInput('')
  }

  function removeTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((task) => !task.done))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'done') return task.done
    if (filter === 'pending') return !task.done
    return true
  })

  const hasCompletedTasks = tasks.some((t) => t.done)

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
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Gestor de Tareas (Estado de Array)
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Nueva tarea..."
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #d1d5db',
            fontSize: 14,
            outline: 'none',
          }}
        />

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#4b5563' }}>Prioridad:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'alta' | 'normal')}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
              fontSize: 13,
              backgroundColor: '#fff',
              outline: 'none',
            }}
          >
            <option value="normal">Normal</option>
            <option value="alta">Alta</option>
          </select>

          <button
            onClick={addTask}
            style={{
              marginLeft: 'auto',
              padding: '8px 16px',
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            Agregar
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14, borderBottom: '1px solid #f3f4f6', paddingBottom: 10 }}>
        {(['all', 'pending', 'done'] as TaskFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid',
              borderColor: filter === f ? '#2563eb' : '#d1d5db',
              backgroundColor: filter === f ? '#eff6ff' : '#ffffff',
              color: filter === f ? '#2563eb' : '#374151',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : 'Completadas'}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <p style={{ color: '#9ca3af', fontSize: 14, fontStyle: 'italic', margin: '20px 0', textAlign: 'center' }}>
          No hay tareas en esta categoría.
        </p>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 8px',
              borderBottom: '1px solid #f3f4f6',
              borderRadius: 6,
              transition: 'background-color 0.15s',
            }}
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              style={{ width: 16, height: 16, cursor: 'pointer' }}
            />
            
            <span
              style={{
                flex: 1,
                textDecoration: task.done ? 'line-through' : 'none',
                color: task.done ? '#9ca3af' : '#1f2937',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {task.text}
            </span>

            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 12,
                backgroundColor: task.priority === 'alta' ? '#fee2e2' : '#f3f4f6',
                color: task.priority === 'alta' ? '#b91c1c' : '#4b5563',
              }}
            >
              {task.priority}
            </span>

            <button
              onClick={() => removeTask(task.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ef4444',
                fontSize: 16,
                padding: '2px 6px',
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 10, borderTop: '1px solid #f3f4f6' }}>
          <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>
            {tasks.filter((t) => t.done).length} de {tasks.length} completadas
          </span>

          {hasCompletedTasks && (
            <button
              onClick={clearCompleted}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                padding: 0,
              }}
            >
              Limpiar completadas
            </button>
          )}
        </div>
      )}
    </div>
  )
}

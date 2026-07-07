// src/components/FilterTable.tsx
import { useState, useCallback, useMemo, memo } from 'react'

interface Employee {
  id:         number
  name:       string
  department: string
  salary:     number
  active:     boolean
}

const EMPLOYEES: Employee[] = [
  { id: 1, name: 'Ana García',    department: 'Diseño',       salary: 2800, active: true  },
  { id: 2, name: 'Luis Pérez',    department: 'Ingeniería',   salary: 3500, active: true  },
  { id: 3, name: 'María López',   department: 'Marketing',    salary: 2400, active: false },
  { id: 4, name: 'Carlos Ruiz',   department: 'Ingeniería',   salary: 4000, active: true  },
  { id: 5, name: 'Sofía Torres',  department: 'Diseño',       salary: 3100, active: true  },
  { id: 6, name: 'Pedro Jiménez', department: 'Marketing',    salary: 2600, active: false },
]

// ─── Memoized Row ──────────────────────────────────────────────────────
const EmployeeRow = memo(function EmployeeRow({
  emp,
  onToggle,
  onRaise,
  onRemove,
}: {
  emp:      Employee
  onToggle: (id: number) => void
  onRaise:  (id: number, amount: number) => void
  onRemove: (id: number) => void
}) {
  return (
    <tr style={{ opacity: emp.active ? 1 : 0.5, borderBottom: '1px solid #e5e7eb' }}>
      <td style={{ padding: '12px 14px', fontWeight: 600, color: '#111827' }}>{emp.name}</td>
      <td style={{ padding: '12px 14px', color: '#4b5563', fontSize: 13 }}>{emp.department}</td>
      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#374151', fontFamily: 'monospace' }}>${emp.salary.toLocaleString()}</td>
      <td style={{ padding: '12px 14px' }}>
        <span style={{
          padding:      '3px 10px',
          borderRadius: 12,
          fontSize:     11,
          fontWeight:   700,
          background:   emp.active ? '#dcfce7' : '#f3f4f6',
          color:        emp.active ? '#166534' : '#4b5563',
          border: `1px solid ${emp.active ? '#a7f3d0' : '#e5e7eb'}`,
        }}>
          {emp.active ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => onToggle(emp.id)}
            style={actionBtnStyle}
          >
            {emp.active ? 'Desactivar' : 'Activar'}
          </button>
          <button
            onClick={() => onRaise(emp.id, 200)}
            style={{ ...actionBtnStyle, background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}
          >
            +$200
          </button>
          <button
            onClick={() => onRemove(emp.id)}
            style={{ ...actionBtnStyle, background: '#fef2f2', color: '#991b1b', borderColor: '#fca5a5' }}
          >
            ✕
          </button>
        </div>
      </td>
    </tr>
  )
})

const actionBtnStyle = {
  padding:      '4px 8px',
  borderRadius: 6,
  border:       '1px solid #d1d5db',
  cursor:       'pointer',
  fontSize:     12,
  background:   '#ffffff',
  color: '#374151',
  fontWeight: 600,
  outline: 'none',
}

// ─── Parent Component ───────────────────────────────────────────────────
export default function FilterTable() {
  const [employees,   setEmployees]   = useState<Employee[]>(EMPLOYEES)
  const [deptFilter,  setDeptFilter]  = useState('Todos')
  const [showInactive,setShowInactive]= useState(true)

  const departments = useMemo(
    () => ['Todos', ...new Set(EMPLOYEES.map(e => e.department))],
    []
  )

  const visible = useMemo(
    () => employees.filter(e =>
      (deptFilter === 'Todos' || e.department === deptFilter) &&
      (showInactive || e.active)
    ),
    [employees, deptFilter, showInactive]
  )

  // useCallback: stable handlers prevent unnecessary row re-renders when filters toggle
  const handleToggle = useCallback((id: number) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, active: !e.active } : e))
  }, [])

  const handleRaise = useCallback((id: number, amount: number) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, salary: e.salary + amount } : e))
  }, [])

  const handleRemove = useCallback((id: number) => {
    setEmployees(prev => prev.filter(e => e.id !== id))
  }, [])

  const totalSalary = useMemo(() => visible.reduce((s, e) => s + e.salary, 0), [visible])

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: 700,
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Tabla de Empleados (Stable Callbacks)
      </h3>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
        Callbacks estables para filas memoizadas con <code>React.memo</code>. Modificar filtros no re-renderiza las filas.
      </p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <select
          value={deptFilter}
          onChange={e => setDeptFilter(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, outline: 'none', backgroundColor: '#fff' }}
        >
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', fontWeight: 600, color: '#4b5563' }}>
          <input
            type="checkbox"
            checked={showInactive}
            onChange={e => setShowInactive(e.target.checked)}
            style={{ width: 16, height: 16, cursor: 'pointer' }}
          />
          Mostrar inactivos
        </label>
        <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500, marginLeft: 'auto' }}>
          {visible.length} empleado{visible.length !== 1 ? 's' : ''} · Salario total: ${totalSalary.toLocaleString()}
        </span>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            {['Nombre', 'Depto.', 'Salario', 'Estado', 'Acciones'].map(h => (
              <th key={h} style={{
                textAlign:    'left',
                padding:      '12px 14px',
                fontWeight:   600,
                color:        '#4b5563',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visible.map(emp => (
            <EmployeeRow
              key={emp.id}
              emp={emp}
              onToggle={handleToggle}
              onRaise={handleRaise}
              onRemove={handleRemove}
            />
          ))}
          {visible.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 24, textAlign: 'center', color: '#9ca3af', fontStyle: 'italic', fontSize: 13 }}>
                Sin empleados para los filtros actuales.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

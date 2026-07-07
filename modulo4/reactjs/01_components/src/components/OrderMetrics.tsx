// src/components/OrderMetrics.tsx
import { useState, useMemo } from 'react'

interface Order {
  id:        number
  customer:  string
  amount:    number
  status:    'pending' | 'paid' | 'refunded'
  createdAt: string
}

const ORDERS: Order[] = [
  { id: 1, customer: 'Ana García',    amount:  120.00, status: 'paid',     createdAt: '2024-01-15' },
  { id: 2, customer: 'Luis Pérez',    amount:  340.50, status: 'paid',     createdAt: '2024-01-18' },
  { id: 3, customer: 'María López',   amount:   89.99, status: 'pending',  createdAt: '2024-01-20' },
  { id: 4, customer: 'Carlos Ruiz',   amount:  560.00, status: 'refunded', createdAt: '2024-01-22' },
  { id: 5, customer: 'Ana García',    amount:  210.00, status: 'paid',     createdAt: '2024-02-01' },
  { id: 6, customer: 'Sofía Torres',  amount:   75.00, status: 'pending',  createdAt: '2024-02-05' },
  { id: 7, customer: 'Luis Pérez',    amount: 1100.00, status: 'paid',     createdAt: '2024-02-08' },
  { id: 8, customer: 'Elena Díaz',    amount:  290.00, status: 'paid',     createdAt: '2024-02-10' },
]

export default function OrderMetrics() {
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all')
  const [minAmount,    setMinAmount]    = useState(0)

  // Filtered orders list memo
  const visibleOrders = useMemo(
    () => ORDERS.filter(o =>
      (statusFilter === 'all' || o.status === statusFilter) &&
      o.amount >= minAmount
    ),
    [statusFilter, minAmount]
  )

  // Derived metrics
  const total   = useMemo(() => visibleOrders.reduce((s, o) => s + o.amount, 0), [visibleOrders])
  const average = useMemo(() => visibleOrders.length ? total / visibleOrders.length : 0, [total, visibleOrders.length])
  const maxOrder = useMemo(
    () => visibleOrders.reduce<Order | null>((max, o) => (!max || o.amount > max.amount) ? o : max, null),
    [visibleOrders]
  )
  const byStatus = useMemo(
    () => ({
      paid:     visibleOrders.filter(o => o.status === 'paid').length,
      pending:  visibleOrders.filter(o => o.status === 'pending').length,
      refunded: visibleOrders.filter(o => o.status === 'refunded').length,
    }),
    [visibleOrders]
  )

  const STATUS_COLORS: Record<Order['status'], string> = {
    paid:     '#16a34a',
    pending:  '#d97706',
    refunded: '#9333ea',
  }

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: 580,
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Métricas de Pedidos (Multi-useMemo)
      </h3>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
        Múltiples variables memoizadas calculadas a partir de un listado de pedidos prefiltrado.
      </p>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#4b5563', display: 'flex', flexDirection: 'column', gap: 6 }}>
          Filtrar por Estado
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
            style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, outline: 'none', backgroundColor: '#fff' }}
          >
            <option value="all">Todos</option>
            <option value="paid">Pagado</option>
            <option value="pending">Pendiente</option>
            <option value="refunded">Reembolsado</option>
          </select>
        </label>

        <label style={{ fontSize: 13, fontWeight: 600, color: '#4b5563', display: 'flex', flexDirection: 'column', gap: 6 }}>
          Importe mínimo: ${minAmount}
          <input
            type="range"
            min={0}
            max={500}
            step={50}
            value={minAmount}
            onChange={e => setMinAmount(Number(e.target.value))}
            style={{ width: 160, cursor: 'pointer' }}
          />
        </label>
      </div>

      {/* Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
        marginBottom: 20,
      }}>
        {[
          { label: 'Pedidos filtrados', value: visibleOrders.length },
          { label: 'Suma total',        value: `$${total.toFixed(2)}` },
          { label: 'Promedio',          value: `$${average.toFixed(2)}` },
          { label: 'Mayor pedido',      value: maxOrder ? `$${maxOrder.amount.toFixed(2)} (${maxOrder.customer})` : '—' },
        ].map(({ label, value }) => (
          <div key={label} style={{
            padding: 14,
            background: '#f9fafb',
            borderRadius: 10,
            border: '1px solid #f3f4f6',
            fontSize: 13,
          }}>
            <div style={{ color: '#9ca3af', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 11 }}>{label}</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Count per Status */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {(Object.entries(byStatus) as [Order['status'], number][]).map(([status, count]) => (
          <span key={status} style={{
            padding:    '4px 12px',
            borderRadius: 999,
            fontSize:   12,
            fontWeight: 600,
            background: `${STATUS_COLORS[status]}15`,
            color:      STATUS_COLORS[status],
            border: `1px solid ${STATUS_COLORS[status]}25`,
            textTransform: 'capitalize',
          }}>
            {status}: {count}
          </span>
        ))}
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {['ID', 'Cliente', 'Importe', 'Estado', 'Fecha'].map(h => (
              <th key={h} style={{
                textAlign: 'left',
                padding:   '8px 10px',
                borderBottom: '2px solid #e5e7eb',
                color: '#4b5563',
                fontWeight: 600,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleOrders.map(o => (
            <tr key={o.id}>
              <td style={{ padding: '8px 10px', color: '#9ca3af', fontFamily: 'monospace' }}>#{o.id}</td>
              <td style={{ padding: '8px 10px', fontWeight: 500, color: '#111827' }}>{o.customer}</td>
              <td style={{ padding: '8px 10px', fontWeight: 700, color: '#374151' }}>${o.amount.toFixed(2)}</td>
              <td style={{ padding: '8px 10px' }}>
                <span style={{
                  padding:  '2px 8px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  background: `${STATUS_COLORS[o.status]}15`,
                  color:      STATUS_COLORS[o.status],
                }}>
                  {o.status}
                </span>
              </td>
              <td style={{ padding: '8px 10px', color: '#6b7280' }}>{o.createdAt}</td>
            </tr>
          ))}
          {visibleOrders.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: 24, color: '#9ca3af', fontStyle: 'italic' }}>
                Sin pedidos que coincidan con los filtros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

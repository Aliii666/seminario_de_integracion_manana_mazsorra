// src/components/SimpleInfoTable.tsx
import React from 'react'

export interface TableRow {
  label: string
  value: string | number
  highlight?: boolean
}

interface SimpleInfoTableProps {
  title?: string
  rows: TableRow[]
  striped?: boolean
}

export default function SimpleInfoTable({ title, rows, striped = false }: SimpleInfoTableProps) {
  return (
    <div style={{ maxWidth: 360, background: '#ffffff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 16, fontFamily: 'sans-serif' }}>
      {title && (
        <h3 style={{ margin: '0 0 12px 0', fontSize: 15, color: '#111827', fontWeight: 600 }}>
          {title}
        </h3>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <tbody>
          {rows.map((row, idx) => {
            const isRowHighlighted = row.highlight
            const bg = isRowHighlighted
              ? '#fef9c3'
              : (striped && idx % 2 === 0 ? '#f9fafb' : 'transparent')

            return (
              <tr key={row.label} style={{ backgroundColor: bg }}>
                <td
                  style={{
                    padding: '10px 12px',
                    borderBottom: '1px solid #e5e7eb',
                    color: '#4b5563',
                    width: '60%',
                    fontWeight: 500,
                  }}
                >
                  {row.label}
                </td>
                <td
                  style={{
                    padding: '10px 12px',
                    borderBottom: '1px solid #e5e7eb',
                    color: '#111827',
                    fontWeight: isRowHighlighted ? 700 : 400,
                    textAlign: 'right',
                  }}
                >
                  {row.value}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

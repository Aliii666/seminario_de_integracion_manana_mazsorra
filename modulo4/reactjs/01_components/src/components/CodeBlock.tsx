// src/components/CodeBlock.tsx
import { useClipboard } from '../hooks/useClipboard'

interface CodeBlockProps {
  code: string
  language?: string
}

export default function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const { copy, copied } = useClipboard(1500)

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: 520,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Copiado al Portapapeles (useClipboard Hook)
      </h3>

      <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 12px',
            background: '#1e293b',
          }}
        >
          <span style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>{language}</span>
          <button
            onClick={() => copy(code)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid #334155',
              background: copied ? '#166534' : '#1e293b',
              color:      copied ? '#bbf7d0' : '#94a3b8',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              transition: 'background 0.2s, color 0.2s',
              outline: 'none',
            }}
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre
          style={{
            margin: 0,
            padding: '12px 16px',
            background: '#0f172a',
            color: '#e2e8f0',
            fontSize: 13,
            overflowX: 'auto',
            fontFamily: 'monospace',
          }}
        >
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

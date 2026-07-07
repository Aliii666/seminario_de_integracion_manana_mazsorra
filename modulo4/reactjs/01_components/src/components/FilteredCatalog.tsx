// src/components/FilteredCatalog.tsx
import { useState, useMemo } from 'react'

interface Product {
  id:       number
  name:     string
  category: string
  price:    number
  active:   boolean
  stock:    number
}

const CATALOG: Product[] = [
  { id:  1, name: 'Teclado mecánico',     category: 'Periféricos', price:  89.99, active: true,  stock: 15 },
  { id:  2, name: 'Monitor 27"',          category: 'Pantallas',   price: 349.99, active: true,  stock:  8 },
  { id:  3, name: 'Mouse inalámbrico',    category: 'Periféricos', price:  29.99, active: false, stock:  0 },
  { id:  4, name: 'Webcam HD',            category: 'Cámaras',     price:  59.99, active: true,  stock: 22 },
  { id:  5, name: 'Auriculares BT',       category: 'Audio',       price: 149.99, active: true,  stock:  6 },
  { id:  6, name: 'Micrófono condensador',category: 'Audio',       price: 199.99, active: true,  stock:  3 },
  { id:  7, name: 'Hub USB-C 7 puertos',  category: 'Periféricos', price:  44.99, active: false, stock:  0 },
  { id:  8, name: 'Monitor 32" 4K',       category: 'Pantallas',   price: 699.99, active: true,  stock:  4 },
  { id:  9, name: 'SSD NVMe 2TB',         category: 'Almacenamiento',price:149.99,active: true,  stock: 11 },
  { id: 10, name: 'Cámara mirrorless',    category: 'Cámaras',     price: 899.99, active: true,  stock:  2 },
]

type SortKey = 'name' | 'price' | 'stock'

export default function FilteredCatalog() {
  const [search,    setSearch]    = useState('')
  const [onlyActive,setOnlyActive]= useState(true)
  const [category,  setCategory]  = useState('Todas')
  const [sortBy,    setSortBy]    = useState<SortKey>('name')

  // useMemo 1 — filter (depends on search, onlyActive, category)
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return CATALOG.filter(p =>
      (!onlyActive || p.active) &&
      (category === 'Todas' || p.category === category) &&
      (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    )
  }, [search, onlyActive, category])

  // useMemo 2 — sort (depends on filtered output and sortBy option)
  const sorted = useMemo(
    () => [...filtered].sort((a, b) =>
      sortBy === 'name'  ? a.name.localeCompare(b.name)  :
      sortBy === 'price' ? a.price - b.price              :
                           b.stock - a.stock              // stock desc
    ),
    [filtered, sortBy]
  )

  const categories = useMemo(
    () => ['Todas', ...new Set(CATALOG.map(p => p.category))],
    [] // CATALOG is static — calculates once
  )

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: 600,
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Catálogo Filtrado (useMemo Enlazados)
      </h3>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
        Dos <code>useMemo</code> encadenados de cascada: filtrar → ordenar.
      </p>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 140, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none' }}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: '#fff' }}
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as SortKey)}
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: '#fff' }}
        >
          <option value="name">A–Z</option>
          <option value="price">Precio ↑</option>
          <option value="stock">Stock ↓</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', fontWeight: 600, color: '#4b5563' }}>
          <input
            type="checkbox"
            checked={onlyActive}
            onChange={e => setOnlyActive(e.target.checked)}
            style={{ width: 16, height: 16, cursor: 'pointer' }}
          />
          Solo activos
        </label>
      </div>

      <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 12, fontWeight: 500 }}>
        Viendo {sorted.length} de {CATALOG.length} productos
      </p>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sorted.map(p => (
          <div key={p.id} style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            padding:        '10px 14px',
            background:     p.active ? '#ffffff' : '#f9fafb',
            borderRadius:   8,
            border:         '1px solid #e5e7eb',
            opacity:        p.active ? 1 : 0.5,
          }}>
            <div>
              <span style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{p.name}</span>
              <span style={{ marginLeft: 8, fontSize: 11, color: '#2563eb', backgroundColor: '#eff6ff', padding: '2px 6px', borderRadius: 4, fontWeight: 500 }}>{p.category}</span>
            </div>
            <div style={{ textAlign: 'right', fontSize: 13 }}>
              <div style={{ fontWeight: 700, color: '#059669' }}>${p.price.toFixed(2)}</div>
              <div style={{ color: p.stock < 5 ? '#dc2626' : '#6b7280', fontSize: 11, marginTop: 2, fontWeight: 500 }}>
                Stock: {p.stock}
              </div>
            </div>
          </div>
        ))}
        {sorted.length === 0 && (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: 24, fontSize: 14, fontStyle: 'italic' }}>
            Sin resultados para la búsqueda.
          </p>
        )}
      </div>
    </div>
  )
}

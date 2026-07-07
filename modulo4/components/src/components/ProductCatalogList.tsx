// src/components/ProductCatalogList.tsx
import React from 'react'

export interface Product {
  id: number
  name: string
  price: number
  outOfStock?: boolean
  category?: string
}

interface ProductCatalogListProps {
  products: Product[]
  title?: string
}

export default function ProductCatalogList({
  products,
  title = 'Catálogo',
}: ProductCatalogListProps) {
  return (
    <section style={{ maxWidth: 480, fontFamily: 'sans-serif', background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: 20, color: '#111827', fontWeight: 600 }}>{title}</h2>

      {products.length === 0 ? (
        <p style={{ color: '#9ca3af', fontStyle: 'italic', margin: '8px 0' }}>
          No hay productos disponibles.
        </p>
      ) : (
        <ul style={{ listStyleType: 'disc', paddingLeft: 20, margin: 0 }}>
          {products.map((product) => (
            <li
              key={product.id}
              style={{
                padding: '12px 0',
                borderBottom: '1px solid #f3f4f6',
                opacity: product.outOfStock ? 0.4 : 1,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#374151', fontSize: 14 }}>
                  <strong style={{ fontWeight: 600 }}>{product.name}</strong>
                  {product.category && (
                    <em style={{ marginLeft: 8, fontSize: 12, color: '#2563eb', fontStyle: 'normal', backgroundColor: '#eff6ff', padding: '2px 6px', borderRadius: 4 }}>
                      {product.category}
                    </em>
                  )}
                  {product.outOfStock && (
                    <em style={{ marginLeft: 8, fontSize: 12, color: '#dc2626', fontWeight: 500 }}>
                      Agotado
                    </em>
                  )}
                </span>
                <strong style={{ color: '#111827', fontSize: 15 }}>
                  ${product.price.toFixed(2)}
                </strong>
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #e5e7eb', fontSize: 13, color: '#6b7280', fontWeight: 500 }}>
        Total: {products.length} producto(s)
      </footer>
    </section>
  )
}

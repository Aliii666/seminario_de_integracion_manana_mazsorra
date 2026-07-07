// src/components/PriceTag.tsx
import React from 'react'

type Currency = 'USD' | 'EUR' | 'COP' | 'MXN' | 'GBP'

interface PriceTagProps {
  amount: number
  currency?: Currency
  discountPercent?: number
  size?: 'small' | 'medium' | 'large'
}

export default function PriceTag({
  amount,
  currency = 'USD',
  discountPercent = 0,
  size = 'medium',
}: PriceTagProps) {
  const hasDiscount = discountPercent > 0
  const finalPrice  = hasDiscount ? amount * (1 - discountPercent / 100) : amount

  const symbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    COP: '$',
    MXN: '$',
    GBP: '£',
  }

  const symbol = symbols[currency]

  const priceSizes = {
    small: 14,
    medium: 20,
    large: 32,
  }

  const priceSize = priceSizes[size]

  const priceColor = hasDiscount
    ? '#dc2626'
    : finalPrice > 100
      ? '#2563eb'
      : '#1f2937'

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: 'sans-serif' }}>
      {hasDiscount && (
        <span style={{ fontSize: priceSize * 0.7, color: '#9ca3af', textDecoration: 'line-through', marginBottom: 2 }}>
          {symbol}{amount.toFixed(2)} {currency}
        </span>
      )}
      <span style={{ fontSize: priceSize, fontWeight: 700, color: priceColor }}>
        {symbol}{finalPrice.toFixed(2)} {currency}
      </span>
      {hasDiscount && (
        <span style={{ fontSize: Math.max(10, priceSize * 0.6), color: '#16a34a', fontWeight: 600, marginTop: 2 }}>
          {discountPercent}% de descuento
        </span>
      )}
    </div>
  )
}

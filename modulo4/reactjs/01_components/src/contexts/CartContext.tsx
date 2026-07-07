// src/contexts/CartContext.tsx
import { createContext, useContext, useReducer, useMemo } from 'react'

export interface CartItem {
  id:       number
  name:     string
  price:    number
  quantity: number
}

interface CartState {
  items:  CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM';    item: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'INCREMENT';   id: number }
  | { type: 'DECREMENT';   id: number }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_CART' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find((i) => i.id === action.item.id)
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      }
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }
    case 'DECREMENT':
      return {
        ...state,
        items: state.items
          .map((i) => i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i)
          .filter((i) => i.quantity > 0),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

interface CartContextValue {
  state: CartState
  total: number
  itemCount: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  increment: (id: number) => void
  decrement: (id: number) => void
  clear: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  const total = useMemo(() => state.items.reduce((acc, i) => acc + i.price * i.quantity, 0), [state.items])
  const itemCount = useMemo(() => state.items.reduce((acc, i) => acc + i.quantity, 0), [state.items])

  function addItem(item: Omit<CartItem, 'quantity'>) {
    dispatch({ type: 'ADD_ITEM', item })
  }

  function removeItem(id: number) {
    dispatch({ type: 'REMOVE_ITEM', id })
  }

  function increment(id: number) {
    dispatch({ type: 'INCREMENT', id })
  }

  function decrement(id: number) {
    dispatch({ type: 'DECREMENT', id })
  }

  function clear() {
    dispatch({ type: 'CLEAR' })
  }

  function toggleCart() {
    dispatch({ type: 'TOGGLE_CART' })
  }

  return (
    <CartContext value={{
      state,
      total,
      itemCount,
      addItem,
      removeItem,
      increment,
      decrement,
      clear,
      toggleCart
    }}>
      {children}
    </CartContext>
  )
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return context
}
